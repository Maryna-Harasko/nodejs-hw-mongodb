import { 
  getAllContactsDB,
  getContactByIdDB,
  createContactDB,
  updatedContactDB,
  deleteContactDB } from "../services/contacts.js";
import createHttpError from "http-errors";

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
    throw createHttpError(404, 'Contact not found');
  } else {
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact
    });
  }
};

export async function createContact(req, res) {
  const newContact = await createContactDB(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export async function updatedContact(req, res){
  const { contactId } = req.params;
  
  const contact = await updatedContactDB(contactId, req.body, { new: true });
  if (!contact){
    throw createHttpError(404, 'Contact not found');
  } else {
  res.status(200).json({  status: 200,
	  message: "Successfully patched a contact!",
	  data: contact
  });
  }
};

export async function deleteContact(req, res) {
  const { contactId } = req.params;

  const contact = await deleteContactDB(contactId);
  if(!contact){
    throw createHttpError(404, 'Contact not found');
  } else {
    res.sendStatus(204);
  }
}