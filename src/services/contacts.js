import Contact from "../models/contact.js";

export const getAllContactsDB = () => Contact.find();

export const getContactByIdDB = (id) => Contact.findById(id);

export const createContactDB = (contactData) => Contact.create(contactData);