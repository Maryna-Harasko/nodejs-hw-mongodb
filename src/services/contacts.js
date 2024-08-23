import Contact from "../models/contact.js";
import { createPaginationInfo } from "../utils/createPaginationInfo.js";

export const getAllContactsDB = async (page, perPage, sortOrder, sortBy) => {
  const skip = perPage * (page - 1);

  const [count, contacts] = await Promise.all([Contact.find().countDocuments(), Contact.find().sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage).exec()]);
  const paginationInfo = createPaginationInfo(page, perPage, count);
return {
  contacts,
  ...paginationInfo
};
}; 

export const getContactByIdDB = (id) => Contact.findById(id);

export const createContactDB = (contactData) => Contact.create(contactData);

export const updatedContactDB = (contactId, contactData, options = {}) => Contact.findByIdAndUpdate(contactId, contactData, options);

export const deleteContactDB = (contactId) => Contact.findByIdAndDelete(contactId);