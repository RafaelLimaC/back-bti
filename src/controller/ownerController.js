import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createOwner = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' });
    }

    const newOwner = await prisma.owner.create({
      data: {
        name: req.body.name,
        role: req.body.role
      }
    })

    return res.status(201).json(newOwner)

  } catch (error) {
    return res.status(500).json({ error });
  }
}

export { createOwner };
