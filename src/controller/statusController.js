import { createStatusService, deleteStatusService, getStatusService, updateStatusService } from '../services/statusServices.js';

const createStatus = async (req, res) => {
  try {
    if (!req.body.name || !req.body.acronym) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await createStatusService(req.body.name, req.body.acronym);

    return res.status(201).json(response)

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const getStatus = async (req, res) => {
  try {
    const response = await getStatusService(req, res);

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const updateStatus = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    const response = await updateStatusService(req.body.name, Number(req.params.id))

    return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const deleteStatus = async (req, res) => {
  try {
    const response = await deleteStatusService(Number(req.params.id))

    return res.status(204).send();

  } catch (error) {
    if (error.message.includes('Status is being used in')) {
      return res.status(409).json({ error: error.message });
    }

    return res.status(500).json({ error });
  }
}

export { createStatus, deleteStatus, getStatus, updateStatus };

