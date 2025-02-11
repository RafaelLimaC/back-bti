import type { Request, Response } from 'express';

import { StatusService } from '@/services/statusServices';

export class StatusController {
  constructor(private statusService: StatusService) {}

  async createStatus(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name || !req.body.acronym) {
        return res.status(422).json({ error: 'Missing required field' });
      }

      const statusService = new StatusService();

      const response = await statusService.createStatus({
        name: req.body.name,
        acronym: req.body.acronym,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getStatus(req: Request, res: Response): Promise<Response> {
    try {
      const statusService = new StatusService();

      const response = await statusService.getStatus();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name) {
        return res.status(422).json({ error: 'Missing required field' });
      }

      const statusService = new StatusService();

      const response = await statusService.updateStatus({
        name: req.body.name,
        id: Number(req.params.id),
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteStatus(req: Request, res: Response): Promise<Response> {
    try {
      const statusService = new StatusService();

      await statusService.deleteStatus(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
