import { prisma } from '@/config/prisma';

export class CommentService {
  constructor() {}

  async createComment(input: {
    content: string;
    ticketId: number;
    ownerId: number;
  }) {
    const { content, ticketId, ownerId } = input;

    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId,
        ownerId,
      },
      include: {
        Ticket: true,
        Owner: true,
      },
      omit: {
        ticketId: true,
        ownerId: true,
      },
    });

    return newComment;
  }

  async getComments(ticketId: number) {
    const comments = await prisma.comment.findMany({
      where: {
        ticketId,
      },
      include: {
        Ticket: true,
        Owner: true,
      },
    });

    return comments;
  }

  async updateComment(input: { content: string; id: number }) {
    const { content, id } = input;

    const updatedComment = await prisma.comment.update({
      data: {
        content,
      },
      where: {
        id,
      },
    });

    return updatedComment;
  }

  async deleteComment(id: number) {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });

    return deletedComment;
  }
}
