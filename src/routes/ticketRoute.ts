import { Router } from 'express';

import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTicketByStatus,
  getTickets,
  updateTicket,
} from '../controller/ticketController.js';

const ticketRouter = Router();

ticketRouter.post('/', createTicket);
ticketRouter.get('/', getTickets);
ticketRouter.get('/:id', getTicketById);
ticketRouter.put('/:id', updateTicket);
ticketRouter.delete('/:id', deleteTicket);
ticketRouter.get('/status/:statusId', getTicketByStatus);

export { ticketRouter };
