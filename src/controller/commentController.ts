import type { Request, Response } from 'express';

import { CommentService } from '@/services/commentServices';

export class CommentController {
  constructor(private commentService: CommentService) {}

  async createComment(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.content) {
        return res.status(422).json({ error: 'Content is required' });
      }

      const commentService = new CommentService();

      const response = await commentService.createComment({
        content: req.body.content,
        ticketId: req.body.ticketId,
        ownerId: req.body.ownerId,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getComments(req: Request, res: Response): Promise<Response> {
    try {
      const commentService = new CommentService();

      const response = await commentService.getComments(
        Number(req.params.ticketId),
      );

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateComment(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.content) {
        return res.status(422).json({ error: 'Content is required' });
      }

      const commentService = new CommentService();

      const response = await commentService.updateComment({
        content: req.body.content,
        id: Number(req.params.id),
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteComment(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.params.id) {
        return res.status(422).json({ error: 'Id is required' });
      }

      const commentService = new CommentService();

      await commentService.deleteComment(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
