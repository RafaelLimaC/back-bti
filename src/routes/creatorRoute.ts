import { Router } from 'express';

import { creatorControllerFactory } from '@/routes/factories/creatorControllerFactory';

const creatorRouter = Router();
const creatorController = creatorControllerFactory();

creatorRouter.post('/', (req, res) =>
  creatorController.createCreator(req, res),
);
creatorRouter.get('/', (req, res) => creatorController.getCreator(req, res));
creatorRouter.put('/:id', (req, res) =>
  creatorController.updateCreator(req, res),
);
creatorRouter.delete('/:id', (req, res) =>
  creatorController.deleteCreator(req, res),
);

export { creatorRouter };
