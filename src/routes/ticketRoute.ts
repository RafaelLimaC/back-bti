import { Router } from 'express';

import { ticketControllerFactory } from '@/routes/factories/ticketControllerFactory';

const ticketRouter = Router();
const ticketController = ticketControllerFactory();

ticketRouter.post('/', (req, res) => ticketController.createTicket(req, res));
ticketRouter.get('/', (req, res) => ticketController.getTickets(req, res));
ticketRouter.get('/:id', (req, res) =>
  ticketController.getTicketById(req, res),
);
ticketRouter.get('/status/:statusId', (req, res) =>
  ticketController.getTicketByStatus(req, res),
);
ticketRouter.get('/creator/:creatorId', (req, res) =>
  ticketController.getTicketByStatus(req, res),
);
ticketRouter.put('/:id', (req, res) => ticketController.updateTicket(req, res));
ticketRouter.delete('/:id', (req, res) =>
  ticketController.deleteTicket(req, res),
);

export { ticketRouter };
