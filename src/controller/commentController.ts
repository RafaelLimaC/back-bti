import type { Request, Response } from 'express';

import {
  createCommentService,
  getCommentsService,
  updateCommentService,
} from '@/services/commentServices';

export const createComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (!req.body.content) {
      return res.status(422).json({ error: 'Content is required' });
    }

    const response = await createCommentService({
      content: req.body.content,
      ticketId: req.body.ticketId,
      ownerId: req.body.ownerId,
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getComments = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getCommentsService(Number(req.params.ticketId));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (!req.body.content) {
      return res.status(422).json({ error: 'Content is required' });
    }

    const response = await updateCommentService({
      content: req.body.content,
      id: Number(req.params.id),
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
