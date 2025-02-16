import type { Request, Response } from 'express';

import { CreatorService as CreatorServices } from '@/services/creatorServices';

export class CreatorController {
  constructor(private creatorService: CreatorServices) {}

  async createCreator(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name) {
        return res.status(422).json({ error: 'Name is required' });
      }

      const creatorService = new CreatorServices();

      const response = await creatorService.createCreator({
        name: req.body.name,
        role: req.body.role,
        sectorId: req.body.sectorId,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getCreator(req: Request, res: Response): Promise<Response> {
    try {
      const creatorService = new CreatorServices();

      const response = await creatorService.getCreators();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateCreator(req: Request, res: Response): Promise<Response> {
    try {
      const creatorService = new CreatorServices();

      const response = await creatorService.updateCreator({
        name: req.body.name,
        role: req.body.role,
        sectorId: req.body.sectorId,
        id: Number(req.params.id),
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteCreator(req: Request, res: Response): Promise<Response> {
    try {
      const creatorService = new CreatorServices();

      await creatorService.deleteCreator(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
