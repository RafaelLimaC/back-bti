import { Router } from 'express';
import { createTicket } from '../controller/ticketController.js';

const router = Router();

router.post('/', createTicket);

export default router;