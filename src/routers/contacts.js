import { Router } from "express";
import { createContact, getAllContacts, getContactById, updatedContact } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContacts));

router.get('/contacts/:contactId', ctrlWrapper(getContactById));

router.post('/contacts', ctrlWrapper(createContact));

router.patch('/contacts/:contactId', ctrlWrapper(updatedContact));

export default router;