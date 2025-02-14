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

export const updateCommentService = async (input: {
  content: string;
  id: number;
}) => {
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
};

export const deleteCommentService = async (id: number) => {
  const deletedComment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  return deletedComment;
};
