import { Router } from "express";
import { createContact, getAllContacts, getContactById, updatedContact, deleteContact } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { createContactSchema } from "../validation/createContactSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContact));

router.patch('/:contactId', isValidId, validateBody(createContactSchema), ctrlWrapper(updatedContact));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;