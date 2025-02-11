import { Router } from 'express';

import { statusControllerFactory } from '@/routes/factories/statusControllerFactory';

const statusRouter = Router();
const statusController = statusControllerFactory();

statusRouter.post('/', (req, res) => statusController.createStatus(req, res));
statusRouter.get('/', (req, res) => statusController.getStatus(req, res));
statusRouter.put('/:id', (req, res) => statusController.updateStatus(req, res));
statusRouter.delete('/:id', (req, res) =>
  statusController.deleteStatus(req, res),
);

export { statusRouter };
