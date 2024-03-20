import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import * as contacts from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "delete success",
  });
};

const createContact = async (req, res) => {
  const result = await contacts.addContact();
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
