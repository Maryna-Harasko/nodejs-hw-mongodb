import Contact from "../models/contact.js";

export const getAllContactsDB = () => Contact.find();