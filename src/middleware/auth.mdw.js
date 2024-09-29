import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/keys.js";

const authorizationToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(403).json({
        Message: "Missing Bearer token",
      });
    }

    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      res.status(403).json({
        Message: "Invalid Bearer",
      });
    }
    const user = jwt.verify(token, SECRET_KEY);
    if (!user) {
      res.status(403).json({
        Message: "Invalid token",
      });
    }
    req.user = user;

    console.log("~ authorizationToken ~ user: ", user);
    next();
  } catch (error) {
    return res.status(401).json({
      Message: error.Message,
    });
  }
};

export default authorizationToken;
