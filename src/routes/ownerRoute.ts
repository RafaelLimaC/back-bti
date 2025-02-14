import { Router } from 'express';

import { ownerControllerFactory } from '@/routes/factories/ownerControllerFactory';

const ownerRouter = Router();
const ownerController = ownerControllerFactory();

ownerRouter.post('/', (req, res) => ownerController.createOwner(req, res));
ownerRouter.get('/', (req, res) => ownerController.getOwner(req, res));
ownerRouter.put('/:id', (req, res) => ownerController.updateOwner(req, res));
ownerRouter.delete('/:id', (req, res) => ownerController.deleteOwner(req, res));

export { ownerRouter };
