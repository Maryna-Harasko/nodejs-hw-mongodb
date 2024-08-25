import Contact from "../models/contact.js";
import { createPaginationInfo } from "../utils/createPaginationInfo.js";

export const getAllContactsDB = async (page, perPage, sortOrder, sortBy, userId) => {
  const skip = perPage * (page - 1);

  const [count, data] = await Promise.all([Contact.find({userId}).countDocuments(), Contact.find({userId}).sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage).exec()]);
  const paginationInfo = createPaginationInfo(page, perPage, count);
return {
  data,
  ...paginationInfo
};
}; 

export const getContactByIdDB = (id, userId) => Contact.findById({_id: id, userId});

export const createContactDB = (contactData) => Contact.create(contactData);

export const updatedContactDB = (contactId, contactData, userId, options = {}) => Contact.findByIdAndUpdate({_id: contactId, userId}, contactData, options);

export const deleteContactDB = (contactId, userId) => Contact.findByIdAndDelete({ _id: contactId, userId });