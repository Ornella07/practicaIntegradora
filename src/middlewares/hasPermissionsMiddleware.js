export const hasAdminPermission = () => {
    return async (req, res, next) => {
      const { role } = req.user;
  
      if (role === "Admin") {
        next();
      } else {
        return res.redirect("/");
      }
    };
  };
  
  export const hasUserPermission = () => {
    return async (req, res, next) => {
      const { role } = req.user;
  
      if (role === "user") {
        next();
      } else {
        return res.redirect("/");
      }
    };
  };