import { Router } from 'express';
import { createTicket, deleteTicket, getTicketById, getTicketByStatus, getTickets, updateTicket } from '../controller/ticketController.js';

const router = Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.get('/status/:statusId', getTicketByStatus);

export default router;