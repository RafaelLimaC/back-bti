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
  if (!await prisma.status.findUnique({ where: { id: id } })) {
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
      id: id
    }
  })

  return updatedStatus
}

const deleteStatusService = async (id) => {
  if (!await prisma.status.findUnique({ where: { id: id } })) {
    throw new Error("Status not found");
  }

  const statusCount = await prisma.ticket.count({
    where: {
      statusId: id
    }
  })

  if (statusCount > 0) {
    throw new Error(`Status is being used in ${statusCount} tickets.`);
  }

  await prisma.status.delete({
    where: {
      id: id
    }
  })
}


export { createStatusService, deleteStatusService, getStatusService, updateStatusService };

