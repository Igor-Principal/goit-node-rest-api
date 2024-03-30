import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { findUser } from "../services/authServices.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authoriztion header not found"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = findUser({ _id: id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    // if (!user.token) {
    //   return next(HttpError(401, "Token invalid"));
    // }
    next();
  } catch {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
