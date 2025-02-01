import { Router } from 'express';
import { createTicket, getTickets, getTicketsById } from '../controller/ticketController.js';

const router = Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketsById);

export default router;