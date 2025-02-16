import { prisma } from '@/config/prisma';

export class TicketService {
  constructor() {}

  async createTicket(input: {
    title: string;
    description: string;
    statusId: number;
    ownerId: number;
    creatorId: number;
  }) {
    const { title, description, statusId, ownerId, creatorId } = input;

    const statusExists = await prisma.status.findUnique({
      where: { id: Number(statusId) },
    });

    if (!statusExists) {
      throw new Error('Status id not found');
    }

    const ticketData = {
      title,
      description,
      statusId: Number(statusId),
      TicketOwner: createTicketOwnerData(ownerId),
      TicketCreator: createTicketCreatorData(creatorId),
    };

    const newTicket = await prisma.ticket.create({
      data: ticketData,
      include: includeCreatorOwner,
    });

    return newTicket;
  }

  async getTickets() {
    const tickets = await prisma.ticket.findMany({
      include: includeCreatorOwner,
    });

    return tickets;
  }

  async getTicketById(id: number) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
      include: includeCreatorOwner,
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return ticket;
  }

  async getTicketByStatus(statusId: number) {
    const statusExists = await prisma.status.findUnique({
      where: { id: Number(statusId) },
    });

    if (!statusExists) {
      throw new Error('Status id not found');
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        statusId: statusId,
      },
      include: includeCreatorOwner,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tickets;
  }

  async getTicketByCreator(creatorId: number) {
    const tickets = await prisma.ticket.findMany({
      where: {
        TicketCreator: {
          some: {
            creatorId: creatorId,
          },
        },
      },
      include: includeCreatorOwner,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tickets;
  }

  // arrumar o edit dos tickets (não dá pra remover owners e creators atualmente)
  // vou ter q ler todos os creators owners que tem, comparar com os que os q ele passou, remover/adicionar os novos
  // update se passar alguma coisa pega o valor passado, se não fica o atual do banco
  async updateTicket(input: {
    title: string;
    description: string;
    statusId: number;
    ticketId: number;
    ownerId: number;
    creatorId: number;
  }) {
    const { title, description, statusId, ticketId, ownerId, creatorId } =
      input;

    const ticketExists = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticketExists) {
      throw new Error('Ticket id not found');
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        title: title,
        description: description,
        statusId: statusId,
        TicketOwner: ownerId
          ? {
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
                  },
                },
              },
            }
          : undefined,
        TicketCreator: creatorId
          ? {
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
                  },
                },
              },
            }
          : undefined,
      },
      include: includeCreatorOwner,
    });

    return updatedTicket;
  }

  async deleteTicket(id: number) {
    const ticketExists = await prisma.ticket.findFirst({
      where: {
        id,
      },
    });

    if (!ticketExists) {
      throw new Error('Ticket does not exists');
    }

    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}

const createTicketOwnerData = (ownerId: number | number[]) => {
  if (Array.isArray(ownerId)) {
    return { create: ownerId.map((id) => ({ ownerId: id })) };
  } else if (ownerId) {
    return { create: [{ ownerId }] };
  }
  return undefined;
};

const createTicketCreatorData = (creatorId: number | number[]) => {
  if (Array.isArray(creatorId)) {
    return { create: creatorId.map((id) => ({ creatorId: id })) };
  } else if (creatorId) {
    return { create: [{ creatorId }] };
  }
  return undefined;
};

const includeCreatorOwner = {
  TicketOwner: {
    include: {
      Owner: {
        select: {
          name: true,
          role: true,
        },
      },
    },
  },
  TicketCreator: {
    include: {
      Creator: {
        select: {
          name: true,
          role: true,
        },
      },
    },
  },
};
