import { Router } from 'express';

import { createComment } from '@/controller/commentController';

const commentRouter = Router();

commentRouter.post('/', createComment);

export { commentRouter };
