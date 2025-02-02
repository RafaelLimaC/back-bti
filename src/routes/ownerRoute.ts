import { Router } from 'express';
import { createOwner, deleteOwner, getOwner, updateOwner } from '../controller/ownerController.js';

const router = Router();

router.post('/', createOwner);
router.get('/', getOwner);
router.put('/:id', updateOwner)
router.delete('/:id', deleteOwner)

export default router;