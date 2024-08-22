import Contact from "../models/contact.js";

export const getAllContactsDB = () => Contact.find();

export const getContactByIdDB = (id) => Contact.findById(id);

export const createContactDB = (contactData) => Contact.create(contactData);

export const updatedContactDB = (contactId, contactData, options = {}) => Contact.findByIdAndUpdate(contactId, contactData, options);

export const deleteContactDB = (contactId) => Contact.findByIdAndDelete(contactId);