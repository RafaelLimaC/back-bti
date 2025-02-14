import type { Request, Response } from 'express';

import { OwnerService } from '@/services/ownerServices';

export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  async createOwner(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name) {
        return res.status(422).json({ error: 'Name is required' });
      }

      const ownerService = new OwnerService();

      const response = await ownerService.createOwner({
        name: req.body.name,
        role: req.body.role,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOwner(req: Request, res: Response): Promise<Response> {
    try {
      const ownerService = new OwnerService();

      const response = await ownerService.getOwner();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateOwner(req: Request, res: Response): Promise<Response> {
    try {
      const ownerService = new OwnerService();

      const response = await ownerService.updateOwner({
        name: req.body.name,
        role: req.body.role,
        id: Number(req.params.id),
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteOwner(req: Request, res: Response): Promise<Response> {
    try {
      const ownerService = new OwnerService();

      await ownerService.deleteOwner(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
