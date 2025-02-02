import { Router } from 'express';

import {
  createOwner,
  deleteOwner,
  getOwner,
  updateOwner,
} from '@/controller/ownerController';

const ownerRouter = Router();

ownerRouter.post('/', createOwner);
ownerRouter.get('/', getOwner);
ownerRouter.put('/:id', updateOwner);
ownerRouter.delete('/:id', deleteOwner);

export { ownerRouter };
