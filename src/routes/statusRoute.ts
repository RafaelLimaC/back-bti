import { Router } from 'express';
import { createStatus, deleteStatus, getStatus, updateStatus } from '../controller/statusController.js';

const router = Router();

router.post('/', createStatus);
router.get('/', getStatus);
router.put('/:id', updateStatus)
router.delete('/:id', deleteStatus)

export default router;