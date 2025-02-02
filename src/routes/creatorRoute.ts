import { Router } from 'express';

import {
  createCreator,
  deleteCreator,
  getCreator,
  updateCreator,
} from '@/controller/creatorController';

const creatorRouter = Router();

creatorRouter.post('/', createCreator);
creatorRouter.get('/', getCreator);
creatorRouter.put('/:id', updateCreator);
creatorRouter.delete('/:id', deleteCreator);

export { creatorRouter };
