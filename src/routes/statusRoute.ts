import { Router } from 'express';

import {
  createStatus,
  deleteStatus,
  getStatus,
  updateStatus,
} from '../controller/statusController.js';

const statusRouter = Router();

statusRouter.post('/', createStatus);
statusRouter.get('/', getStatus);
statusRouter.put('/:id', updateStatus);
statusRouter.delete('/:id', deleteStatus);

export { statusRouter };
