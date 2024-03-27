import httpServer from "#configs/server/http.config.js";
import { configEnv } from "#configs/env.config.js";

import { cartServices } from "#services/factory.js";

import {
  getCartByUserId,
  postNewCart,
  postProductToCart,
} from "#utils/fetch.js";
import logger from "#utils/logger.js";
import sendInvoceToEmail from "#utils/mail.js";

import jwt from "jsonwebtoken";
import { Server } from "socket.io";

const URL = configEnv.URL;

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  socket.on("newProductClient", (product) => {
    fetch(`${URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        socketServer.emit("productCreatedServer", data.productCreated);
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  socket.on("newMessageClient", (message) => {
    fetch(`${URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        socketServer.emit("messageCreatedServer", data.messageCreated);
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  socket.on("deleteProductClient", (id) => {
    fetch(`${URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Contet-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        socketServer.emit("productDeletedServer", id);
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  socket.on("addProductToCart", async (productId) => {
    const jwtCookie = socket.request.headers.cookie;

    if (jwtCookie && jwtCookie.includes("token=")) {
      const jwtToken = jwtCookie.split("=")[1];
      try {
        const tokenData = jwt.verify(jwtToken, configEnv.JWT_SECRET);

        const isUser = tokenData.user.role;

        if (isUser === "Admin") {
          socket.emit("adminError");
        } else {
          const userId = tokenData.user.userId;

          const cartId = await getCartByUserId(userId);

          if (!cartId) {
            const newCart = await postNewCart(userId, productId);
            if (newCart) {
              socket.emit("productSuccessfullyAdded");
            }
          } else {
            const addProductToCart = await postProductToCart(
              cartId._id,
              productId
            );

            if (addProductToCart) {
              socket.emit("productSuccessfullyAdded");
            }
          }
        }
      } catch (error) {
        console.error("Error verifying JWT token: ", error);
      }
    } else {
      console.error("JWT token not found in request headers.");
    }
  });

  socket.on("checkout", async (cartId) => {
    try {
      fetch(`${URL}/api/carts/${cartId}/purchase`, {
        method: "POST",
        headers: {
          "Contet-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let id = data.hasNewCart ? data.buyCart._id : cartId;

          if (data.message === "Payment failed") {
            socketServer.emit("checkoutFailed");
          }

          if (data.message === "Payment successufully") {
            socketServer.emit("checkoutSuccessfully", id);
          }
        })
        .catch((err) => {
          logger.error(err);
        });
    } catch (error) {
      console.error("Error purchasing: ", error);
    }
  });

  socket.on("sendInvoce", async (cartId) => {
    const jwtCookie = socket.request.headers.cookie;

    if (jwtCookie && jwtCookie.includes("token=")) {
      const jwtToken = jwtCookie.split("=")[1];

      try {
        const tokenData = jwt.verify(jwtToken, configEnv.JWT_SECRET);

        const userEmail = tokenData.user.email;

        const purchasedData = await cartServices.getCartByCartId(cartId);

        await sendInvoceToEmail(userEmail, purchasedData.products);

        socket.emit("emailSuccess");
      } catch (error) {
        console.error("Error verifying JWT token: ", error);
      }
    } else {
      console.error("JWT token not found in request headers.");
    }
  });

  socket.on("disconnect", () => {});
});

export default socketServer;