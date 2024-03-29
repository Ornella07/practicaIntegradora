import { Router } from "express";
import { generateFakeProduct } from "#utils/fakerData.js";
import logger from "#utils/logger.js";

const mockRouter = Router();

mockRouter.get("/mockingproducts", (req, res) => {
  const mockProductsArray = [];

  for (let i = 0; i < 50; i++) {
    mockProductsArray.push(generateFakeProduct());
  }

  res.status(200).json({ message: "OK", products: mockProductsArray });
});

mockRouter.get("/loggertest", (req, res) => {
  logger.debug("This is a debug logger test");
  logger.http("This is a http logger test /loggertest");
  logger.info("This is an info logger test");
  logger.warning("This is a warn logger test");
  logger.error("This is an error logger test");
  logger.fatal("This is a fatal logger test");
  res.status(200).json({ message: "OK" });
});

export default mockRouter;