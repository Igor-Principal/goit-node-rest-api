import express from "express";
const ctrl = require("../controllers/contactsControllers");
const validadeBody = require("../helpers/validateBody");
const { schema } = require("../schemas/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.post(
  "/",
  validadeBody(schema.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  validadeBody(schema.updateContactSchema),
  ctrl.updateContact
);

export default contactsRouter;
