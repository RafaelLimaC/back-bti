import { Router } from 'express';

import {
  createComment,
  getComments,
  updateComment,
} from '@/controller/commentController';

const commentRouter = Router();

commentRouter.post('/', createComment);
commentRouter.get('/:ticketId', getComments);
commentRouter.put('/:id', updateComment);

export { commentRouter };
