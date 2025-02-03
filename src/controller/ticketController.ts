import type { Request, Response } from 'express';

import {
  createTicketService,
  deleteTicketService,
  getTicketByIdService,
  getTicketByStatusService,
  getTicketsService,
  updateTicketService,
} from '@/services/ticketServices';

export const createTicket = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (!req.body.title || !req.body.description || !req.body.statusId) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await createTicketService({
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
};

export const getTickets = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getTicketsService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTicketById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getTicketByIdService(Number(req.params.id));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTicketByStatus = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getTicketByStatusService(
      Number(req.params.statusId),
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTicket = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (
      req.body.title === undefined &&
      req.body.statusId === undefined &&
      req.body.description === undefined
    ) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await updateTicketService({
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
};

export const deleteTicket = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await deleteTicketService(Number(req.params.id));

    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};
