import { Router } from 'express';

import {
  createTicket,
  deleteTicket,
  getTicketByCreator,
  getTicketById,
  getTicketByStatus,
  getTickets,
  updateTicket,
} from '@/controller/ticketController';

const ticketRouter = Router();

ticketRouter.post('/', createTicket);
ticketRouter.get('/', getTickets);
ticketRouter.get('/:id', getTicketById);
ticketRouter.get('/status/:statusId', getTicketByStatus);
ticketRouter.get('/creator/:creatorId', getTicketByCreator);
ticketRouter.put('/:id', updateTicket);
ticketRouter.delete('/:id', deleteTicket);

export { ticketRouter };
