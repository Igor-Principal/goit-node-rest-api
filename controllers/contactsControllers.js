import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import Contact from "../models/Contact.js";
import * as contacts from "../services/contactsServices.js";
import fs from "fs/promises";
import path from "path";

const avatarsPath = path.resolve("public", "avatars");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit } = req.query;
  const result = await contacts.listContacts(owner, page, limit);
  const total = await contacts.countContacts({ owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result, total });
};

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contacts.getContactByFilter({ owner, _id: id });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const user = await Contact.findOne({ _id: id });
  console.log(user);
  const result = await contacts.removeContact({ owner, _id: id });
  if (!result || !user) {
    throw HttpError(404, "Not found");
  }
  const { _doc } = user;
  console.log(user);
  res.json(_doc);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatar", filename);
  const result = await contacts.addContact({ ...req.body, avatarURL, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const response = await contacts.updateContact({ owner, _id: id }, req.body);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.json(response);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const status = req.body.favorite;
  const response = await contacts.updateFavoriteById(
    { _id: id, owner },
    status
  );
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
