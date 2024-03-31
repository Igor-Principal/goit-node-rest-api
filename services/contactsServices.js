import Contact from "../models/Contact.js";

async function listContacts(filter = {}, setting = {}) {
  return Contact.find({ filter }, "-createdAt -updatedAt", setting).populate(
    "owner",
    "email"
  );
}

async function countContacts(filter) {
  return Contact.countDocuments(filter);
}

async function getContactByFilter(filter) {
  return Contact.findOne(filter);
}

async function removeContact(filter) {
  Contact.findOneAndDelete(filter);
}

async function addContact(data) {
  return Contact.create(data);
}

const updateContact = async (filter, data) => {
  return Contact.findOneAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const updateFavoriteById = async (id, newData) => {
  return await Contact.findByIdAndUpdate(id, newData, { new: true });
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
