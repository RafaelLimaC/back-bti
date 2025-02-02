import { prisma } from '../config/prisma.js';

const createTicketService = async (title, description, statusId, ownerId, creatorId) => {
  const statusExists = await prisma.status.findUnique({ where: { id: Number(statusId) } });

  if (!statusExists) {
    throw new Error("Status id not found");
  }

  const ticketData = {
    title,
    description,
    statusId: Number(statusId),
    TicketOwner: Array.isArray(ownerId) ? { create: ownerId.map(id => ({ ownerId: id })) } : ownerId ? { create: [{ ownerId }] } : undefined,
    TicketCreator: Array.isArray(creatorId) ? { create: creatorId.map(id => ({ creatorId: id })) } : creatorId ? { create: [{ creatorId }] } : undefined,
  };

  const newTicket = await prisma.ticket.create({
    data: ticketData,
    include: {
      TicketOwner: true,
      TicketCreator: true,
    },
  });

  return newTicket;
}

const getTicketsService = async () => {
  const tickets = await prisma.ticket.findMany({
    include: {
      TicketOwner: true,
      TicketCreator: true,
    },
  });

  return tickets;
}

const getTicketByIdService = async (id) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: id,
    },
    include: {
      TicketOwner: true,
      TicketCreator: true,
    },
  });

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  return ticket;
}

const getTicketByStatusService = async (statusId) => {
  if (!await prisma.status.findUnique({ where: { id: statusId } })) {
    throw new Error("Status id not found");
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      statusId: statusId,
    },
    include: {
      TicketOwner: true,
      TicketCreator: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return tickets;
}

const updateTicketService = async (title, description, statusId, ticketId, ownerId, creatorId) => {

  if (!await prisma.ticket.findUnique({ where: { id: ticketId } })) {
    throw new Error("Ticket id not found");
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      title: title,
      description: description,
      statusId: statusId,
      TicketOwner: ownerId ? {
        upsert: {
          create: {
            ownerId,
          },
          update: {
            ownerId,
          },
          where: {
            ticketId_ownerId: {
              ownerId,
              ticketId,
            }
          },
        }
      } : undefined,
      TicketCreator: creatorId ? {
        upsert: {
          create: {
            creatorId,
          },
          update: {
            creatorId,
          },
          where: {
            creatorId_ticketId: {
              creatorId,
              ticketId,
            }
          },
        }
      } : undefined,
    },
    include: {
      TicketOwner: true,
      TicketCreator: true,
    },
  });

  return updatedTicket;
}

const deleteTicketService = async (id) => {
  await prisma.ticket.delete({
    where: {
      id: id,
    },
  });
}



export { createTicketService, deleteTicketService, getTicketByIdService, getTicketByStatusService, getTicketsService, updateTicketService };

