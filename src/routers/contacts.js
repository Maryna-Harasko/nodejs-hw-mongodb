import { Router } from "express";
import { createContact, getAllContacts, getContactById, updatedContact, deleteContact } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { createContactSchema } from "../validation/createContactSchema.js";
import { updateContactSchema } from "../validation/updateContactSchema.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContact));

router.patch('/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(updatedContact));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;