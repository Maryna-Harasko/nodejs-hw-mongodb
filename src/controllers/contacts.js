import { getAllContactsDB, getContactByIdDB } from "../services/contacts.js";

export async function getAllContacts(req, res){
  const contacts = await getAllContactsDB();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts
  });
};

export async function getContactById(req, res){
  const {contactId} = req.params;
  const contact = await getContactByIdDB(contactId);

  if(!contact){
    res.status(404).json({
      message: 'Contact not found'
  });
  } else {
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact
    });
  }
};