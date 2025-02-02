import { createTicketService, deleteTicketService, getTicketByIdService, getTicketByStatusService, getTicketsService, updateTicketService } from '../services/ticketServices.js';


const createTicket = async (req, res) => {
  try {
    const { title, description, statusId, ownerId, creatorId } = req.body;

    if (!title || !description || !statusId) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await createTicketService(title, description, statusId, ownerId, creatorId);

    return res.status(201).json(response);

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTickets = async (req, res) => {
  try {
    const response = await getTicketsService();

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const response = await getTicketByIdService(id);

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTicketByStatus = async (req, res) => {
  try {
    const statusId = Number(req.params.statusId)

    const response = await getTicketByStatusService(statusId)

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const updateTicket = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description
    const statusId = req.body.statusId
    const ticketId = Number(req.params.id);
    const ownerId = Number(req.body.ownerId)
    const creatorId = Number(req.body.creatorId)

    if (title === undefined && statusId === undefined && description === undefined) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await updateTicketService(title, description, statusId, ticketId, ownerId, creatorId)

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const response = await deleteTicketService(id)

    return res.status(204).send();

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { createTicket, deleteTicket, getTicketById, getTicketByStatus, getTickets, updateTicket };

