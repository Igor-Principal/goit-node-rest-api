import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactFavoriteSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import isValideId from "../middlewares/isValideId.js";
import isValideBody from "../middlewares/isValidBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValideId, ctrl.getOneContact);

contactsRouter.delete("/:id", isValideId, ctrl.deleteContact);

contactsRouter.post(
  "/",
  upload.single("avatar"),
  validateBody(createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isValideBody,
  isValideId,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValideId,
  validateBody(updateContactFavoriteSchema),
  ctrl.updateStatusContact
);

export default contactsRouter;
