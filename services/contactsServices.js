import Contact from "../models/Contact.js";

async function listContacts(owner, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  return Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
}

async function countContacts(filter) {
  return Contact.countDocuments(filter);
}

async function getContactByFilter(filter) {
  return Contact.findOne(filter);
}

async function removeContact(filter) {
  return await Contact.findOneAndDelete(filter);
}

async function addContact(data) {
  return Contact.create(data);
}

const updateContact = async (filter, data) => {
  return Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
  });
};

const updateFavoriteById = async (id, status) => {
  const contactStatus = { favorite: status };
  return await Contact.findOneAndUpdate(id, contactStatus, { new: true });
};

export {
  listContacts,
  countContacts,
  getContactByFilter,
  addContact,
  removeContact,
  updateContact,
  updateFavoriteById,
};
