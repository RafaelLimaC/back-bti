import { Router } from 'express';

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '@/controller/commentController';

const commentRouter = Router();

commentRouter.post('/', createComment);
commentRouter.get('/:ticketId', getComments);
commentRouter.put('/:id', updateComment);
commentRouter.delete('/:id', deleteComment);

export { commentRouter };
