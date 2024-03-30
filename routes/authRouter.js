import express from "express";
import authControllers from "../controllers/authControllers.js";
import { userSigninSchema, userSignupSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  validateBody(userSigninSchema),
  authControllers.signin
);

export default authRouter;
