import { CommentController } from '@/controller/commentController';
import { CommentService } from '@/services/commentServices';

export function commentControllerFactory() {
  const commentService = new CommentService();
  const commentController = new CommentController(commentService);
  return commentController;
}
