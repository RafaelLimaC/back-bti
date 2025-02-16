import { TicketController } from '@/controller/ticketController';
import { TicketService } from '@/services/ticketServices';

export function ticketControllerFactory() {
  const ticketService = new TicketService();
  const ticketController = new TicketController(ticketService);
  return ticketController;
}
