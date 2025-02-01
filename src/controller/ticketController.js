import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTicket = async (req, res) => {
  try {
    const { title, description, statusId, ownerId, creatorId } = req.body;

    if (!title || !description || !statusId) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const statusExists = await prisma.status.findUnique({ where: { id: Number(statusId) } });

    if (!statusExists) {
      return res.status(404).json({ error: "Status id not found" });
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

    return res.status(201).json(newTicket);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        TicketOwner: true,
        TicketCreator: true,
      },
    });
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        TicketOwner: true,
        TicketCreator: true,
      },
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticketId = Number(req.params.id);
    const ownerId = Number(req.body.ownerId)
    const creatorId = Number(req.body.creatorId)

    if (req.body.title === undefined && req.body.statusId === undefined && req.body.description === undefined) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    if (!await prisma.ticket.findUnique({ where: { id: ticketId } })) {
      return res.status(404).json({ error: "Ticket id not found" });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        title: req.body.title,
        description: req.body.description,
        statusId: req.body.statusId,
        TicketOwner: req.body.ownerId ? {
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
        TicketCreator: req.body.creatorId ? {
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

    return res.status(200).json(updatedTicket);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTicket = async (req, res) => {
  try {
    await prisma.ticket.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(204).send();

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getTicketByStatus = async (req, res) => {
  try {
    if (!await prisma.status.findUnique({ where: { id: Number(req.params.statusId) } })) {
      return res.status(404).json({ error: "Status id not found" });
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        statusId: Number(req.params.statusId),
      },
      include: {
        TicketOwner: true,
        TicketCreator: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { createTicket, deleteTicket, getTicketById, getTicketByStatus, getTickets, updateTicket };

