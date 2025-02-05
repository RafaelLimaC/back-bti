import { prisma } from '@/config/prisma';

export const createCommentService = async (input: {
  content: string;
  ticketId: number;
  ownerId: number;
}) => {
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
};

export const getCommentsService = async (ticketId: number) => {
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
};
