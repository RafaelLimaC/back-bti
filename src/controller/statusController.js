import { PrismaClient } from '@prisma/client';
import { response } from 'express';

const prisma = new PrismaClient();

const createStatus = async (req, res) => {
  try {
    if (!req.body.name || !req.body.acronym) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    if (await prisma.status.findUnique({ where: { name: req.body.name } })) {
      return res.status(409).json({ error: `'Status ${req.body.name} already exists'` });
    }

    const newStatus = await prisma.status.create({
      data: {
        name: req.body.name,
        acronym: req.body.acronym
      }
    })

    return res.status(201).json(newStatus)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getStatus = async (req, res) => {
  try {
    const status = await prisma.status.findMany();

    return res.status(200).json(status);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateStatus = async (req, res) => {
  try {
    if (!await prisma.status.findUnique({ where: { id: parseInt(req.params.id) } })) {
      return response.status(404).json({ error: error.message });
    }

    if (!req.body.name) {
      return res.status(422).json({ error: 'Missing required field' });
    }

    if (await prisma.status.findUnique({ where: { name: req.body.name } })) {
      return res.status(409).json({ error: `'Status ${req.body.name} already exists'` });
    }

    const updatedStaus = await prisma.status.update({
      data: {
        name: req.body.name
      },
      where: {
        id: parseInt(req.params.id)
      }
    })

    return res.status(200).json(updatedStaus)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteStatus = async (req, res) => {
  try {
    if (!await prisma.status.findUnique({ where: { id: parseInt(req.params.id) } })) {
      return response.status(404).json({ error: error.message });
    }

    await prisma.status.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })

    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export { createStatus, deleteStatus, getStatus, updateStatus };

