import { createOwnerService, deleteOwnerService, getOwnerService, updateOwnerService } from '../services/ownerServices.js';

const createOwner = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' });
    }

    const response = await createOwnerService(req.body.name, req.body.role);

    return res.status(201).json(response)

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const getOwner = async (req, res) => {
  try {
    const response = await getOwnerService(req, res);

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const updateOwner = async (req, res) => {
  try {
    const response = await updateOwnerService(req.body.name, req.body.role, Number(req.params.id))

    return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const deleteOwner = async (req, res) => {
  try {
    const response = await deleteOwnerService(Number(req.params.id))

    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ error });
  }
}

export { createOwner, deleteOwner, getOwner, updateOwner };

