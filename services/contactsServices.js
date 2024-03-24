import { nanoid } from "nanoid";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import Contact from "../models/Contact.js";

// const contactsPath = join("db", "contacts.json");

async function listContacts() {
  return Contact.find();
  // const data = await readFile(contactsPath);
  // return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await Contact.findById(contactId);
  return data;
  // const id = contactId.toString();
  // const contacts = await listContacts();
  // const result = contacts.find((contact) => contact.id === id);
  // return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const dellCont = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return dellCont;
}

async function addContact(data) {
  return Contact.create(data);
  // const contacts = await listContacts();
  // const newContact = {
  //   id: nanoid(),
  // name,
  // email,
  // phone,
  // };
  // contacts.push(newContact);
  // await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // return newContact;
}

const updateContact = async (id, data) => {
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // contacts[index] = { id, ...body };
  // await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // return contacts[index];
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
