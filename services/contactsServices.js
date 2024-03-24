import Contact from "../models/Contact.js";

async function listContacts() {
  return Contact.find();
}

async function getContactById(contactId) {
  const data = await Contact.findById(contactId);
  return data;
}

async function removeContact(contactId) {
  Contact.findByIdAndDelete(contactId);
}

async function addContact(data) {
  return Contact.create(data);
}

const updateContact = async (id, data) => {
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};


const updateFavoriteById = async (id, newData) => {
  return await Contact.findByIdAndUpdate(id, newData, { new: true });
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavoriteById,
};
