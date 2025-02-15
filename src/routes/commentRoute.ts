import { Router } from 'express';

import { commentControllerFactory } from './factories/commentControllerFactory';

const commentRouter = Router();
const commentController = commentControllerFactory();

commentRouter.post('/', (req, res) =>
  commentController.createComment(req, res),
);
commentRouter.get('/:ticketId', (req, res) =>
  commentController.getComments(req, res),
);
commentRouter.put('/:id', (req, res) =>
  commentController.updateComment(req, res),
);
commentRouter.delete('/:id', (req, res) =>
  commentController.deleteComment(req, res),
);

export { commentRouter };
