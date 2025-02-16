import type { Request, Response } from 'express';

import { TicketService } from '@/services/ticketServices';

export class TicketController {
  constructor(private ticketService: TicketService) {}

  async createTicket(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.title || !req.body.description || !req.body.statusId) {
        return res.status(422).json({ error: 'Missing required field' });
      }

      const ticketService = new TicketService();

      const response = await ticketService.createTicket({
        title: req.body.title,
        description: req.body.description,
        statusId: req.body.statusId,
        ownerId: req.body.ownerId,
        creatorId: req.body.creatorId,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTickets(req: Request, res: Response): Promise<Response> {
    try {
      const ticketService = new TicketService();

      const response = await ticketService.getTickets();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTicketById(req: Request, res: Response): Promise<Response> {
    try {
      const ticketService = new TicketService();

      const response = await ticketService.getTicketById(Number(req.params.id));

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTicketByStatus(req: Request, res: Response): Promise<Response> {
    try {
      const ticketService = new TicketService();

      const response = await ticketService.getTicketByStatus(
        Number(req.params.statusId),
      );

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTicketByCreator(req: Request, res: Response): Promise<Response> {
    try {
      const ticketService = new TicketService();

      const response = await ticketService.getTicketByCreator(
        Number(req.params.creatorId),
      );

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateTicket(req: Request, res: Response): Promise<Response> {
    try {
      if (
        req.body.title === undefined &&
        req.body.statusId === undefined &&
        req.body.description === undefined
      ) {
        return res.status(422).json({ error: 'Missing required field' });
      }

      const ticketService = new TicketService();

      const response = await ticketService.updateTicket({
        title: req.body.title,
        description: req.body.description,
        statusId: req.body.statusId,
        ticketId: Number(req.params.id),
        ownerId: Number(req.body.ownerId),
        creatorId: Number(req.body.creatorId),
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteTicket(req: Request, res: Response): Promise<Response> {
    try {
      await this.ticketService.deleteTicket(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
