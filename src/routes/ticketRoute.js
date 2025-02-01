import { Router } from 'express';
import { createTicket, getTicketById, getTickets, updateTicket } from '../controller/ticketController.js';

const router = Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);

export default router;