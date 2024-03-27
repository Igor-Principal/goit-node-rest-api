import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import Contact from "../models/Contact.js";
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
  const { _doc } = await Contact.findOne({ _id: id });
  const result = await Contact.findByIdAndDelete({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(_doc);
};

const createContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const response = await contacts.updateContact(id, req.body);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.json(response);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const response = await contacts.updateFavoriteById(id, req.body);
 
    if (!response) {
      throw HttpError(404, "Not found");
    }
  res.status(200).json(response);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
