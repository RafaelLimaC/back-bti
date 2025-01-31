import { prisma } from '../config/prisma.js';

const createStatusService = async (name, acronym) => {
  if (await prisma.status.findUnique({ where: { name: name } })) {
    throw new Error(`Status ${name} already exists`);
  }

  const newStatus = await prisma.status.create({
    data: {
      name: name,
      acronym: acronym
    }
  })

  return newStatus;
}

const getStatusService = async () => {
  const status = await prisma.status.findMany();

  return status;
}

const updateStatusService = async (name, id) => {
  if (!await prisma.status.findUnique({ where: { id: Number(id) } })) {
    throw new Error("Status not found");
  }

  if (await prisma.status.findUnique({ where: { name: name } })) {
    throw new Error(`Status ${name} already exists`)
  }

  const updatedStatus = await prisma.status.update({
    data: {
      name: name
    },
    where: {
      id: Number(id)
    }
  })

  return updatedStatus
}

const deleteStatusService = async (id) => {
  if (!await prisma.status.findUnique({ where: { id: Number(id) } })) {
    throw new Error("Status not found");
  }

  await prisma.status.delete({
    where: {
      id: id
    }
  })
}


export { createStatusService, deleteStatusService, getStatusService, updateStatusService };

