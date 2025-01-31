import { Router } from 'express';
import { createOwner } from '../controller/ownerController.js';

const router = Router();

router.post('/', createOwner);

export default router;