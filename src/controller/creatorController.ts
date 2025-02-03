import type { Request, Response } from 'express';

import {
  createCreatorService,
  deleteCreatorService,
  getCreatorsService,
  updateCreatorService,
} from '@/services/creatorServices';

export const createCreator = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' });
    }

    const response = await createCreatorService({
      name: req.body.name,
      role: req.body.role,
      sectorId: req.body.sectorId,
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getCreator = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getCreatorsService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateCreator = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await updateCreatorService({
      name: req.body.name,
      role: req.body.role,
      sectorId: req.body.sectorId,
      id: Number(req.params.id),
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteCreator = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await deleteCreatorService(Number(req.params.id));

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
