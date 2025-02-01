import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTicket = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.statusId) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    if (!await prisma.status.findUnique({ where: { id: parseInt(req.body.statusId) } })) {
      return res.status(404).json({ error: "Status id not found" });
    }

    const ticketData = {
      title: req.body.title,
      description: req.body.description,
      statusId: parseInt(req.body.statusId),
      TicketOwner: req.body.ownerIds ? { create: req.body.ownerIds.map(id => ({ ownerId: id })) } : undefined,
      TicketCreator: req.body.creatorIds ? { create: req.body.creatorIds.map(id => ({ creatorId: id })) } : undefined,
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

const getTicketsById = async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(req.params.id),
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


  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { createTicket, getTickets, getTicketsById, updateTicket };

