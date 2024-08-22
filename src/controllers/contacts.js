import { getAllContactsDB } from "../services/contacts.js";

export async function getAllContacts(reg, res){
  const contacts = await getAllContactsDB();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts
  });
};