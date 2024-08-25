import { 
  getAllContactsDB,
  getContactByIdDB,
  createContactDB,
  updatedContactDB,
  deleteContactDB } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { ENABLE_CLOUDINARY } from "../constants/index.js";

export async function getAllContacts(req, res){
  const {page, perPage} = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  
  const contacts = await getAllContactsDB(page, perPage, sortOrder, sortBy, req.user._id);
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts
  });
};

export async function getContactById(req, res){
  const {contactId} = req.params;
  const contact = await getContactByIdDB(contactId, req.user._id);

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
  const contactData = { ...req.body, userId: req.user._id };
  const newContact = await createContactDB(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export async function updatedContact(req, res, next){
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (ENABLE_CLOUDINARY === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await updatedContactDB(
    contactId,
    {
      ...req.body,
      photo: photoUrl,
    },
    req.user._id,
  );

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

  const contact = await deleteContactDB(contactId, req.user._id);
  if(!contact){
    throw createHttpError(404, 'Contact not found');
  } else {
    res.sendStatus(204);
  }
}