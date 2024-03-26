import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactFavoriteSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import isValideId from "../middlewares/isValideId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValideId, ctrl.getOneContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  "/:id",
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
// DB_HOST =mongodb+srv://Igrprinc:uLt3Rv8qUe6RuZpR@cluster0.pgnjizz.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0
