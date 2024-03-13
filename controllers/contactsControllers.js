const { HttpError, ctrlWrapper } = require("../helpers");
const contacts = require("../services/contactsServices");

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

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
