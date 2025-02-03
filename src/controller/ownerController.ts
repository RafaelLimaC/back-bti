import type { Request, Response } from 'express';

import {
  createOwnerService,
  deleteOwnerService,
  getOwnerService,
  updateOwnerService,
} from '@/services/ownerServices';

export const createOwner = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' });
    }

    const response = await createOwnerService({
      name: req.body.name,
      role: req.body.role,
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getOwner = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await getOwnerService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateOwner = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await updateOwnerService({
      name: req.body.name,
      role: req.body.role,
      id: Number(req.params.id),
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteOwner = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await deleteOwnerService(Number(req.params.id));

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
