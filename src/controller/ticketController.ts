import type { Request, Response } from 'express';

import {
  createTicketService,
  deleteTicketService,
  getTicketByIdService,
  getTicketByStatusService,
  getTicketsService,
  updateTicketService,
} from '@/services/ticketServices';

const createTicket = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, statusId, ownerId, creatorId } = req.body;

    if (!title || !description || !statusId) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await createTicketService(
      title,
      description,
      statusId,
      ownerId,
      creatorId,
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTickets = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = await getTicketsService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTicketById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    const response = await getTicketByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTicketByStatus = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const statusId = Number(req.params.statusId);

    const response = await getTicketByStatusService(statusId);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTicket = async (req: Request, res: Response): Promise<Response> => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const statusId = req.body.statusId;
    const ticketId = Number(req.params.id);
    const ownerId = Number(req.body.ownerId);
    const creatorId = Number(req.body.creatorId);

    if (
      title === undefined &&
      statusId === undefined &&
      description === undefined
    ) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await updateTicketService(
      title,
      description,
      statusId,
      ticketId,
      ownerId,
      creatorId,
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTicket = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    await deleteTicketService(id);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  createTicket,
  deleteTicket,
  getTicketById,
  getTicketByStatus,
  getTickets,
  updateTicket,
};
