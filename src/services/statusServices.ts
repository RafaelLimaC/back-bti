import { prisma } from '@/config/prisma';

export const createStatusService = async (name: string, acronym: string) => {
  if (await prisma.status.findUnique({ where: { name: name } })) {
    throw new Error(`Status ${name} already exists`);
  }

  const newStatus = await prisma.status.create({
    data: {
      name: name,
      acronym: acronym,
    },
  });

  return newStatus;
};

export const getStatusService = async () => {
  const status = await prisma.status.findMany();

  return status;
};

export const updateStatusService = async (name: string, id: number) => {
  if (!(await prisma.status.findUnique({ where: { id } }))) {
    throw new Error('Status not found');
  }

  if (await prisma.status.findUnique({ where: { name } })) {
    throw new Error(`Status ${name} already exists`);
  }

  const updatedStatus = await prisma.status.update({
    data: {
      name,
    },
    where: {
      id,
    },
  });

  return updatedStatus;
};

export const deleteStatusService = async (id: number) => {
  if (!(await prisma.status.findUnique({ where: { id } }))) {
    throw new Error('Status not found');
  }

  const statusCount = await prisma.ticket.count({
    where: {
      statusId: id,
    },
  });

  if (statusCount > 0) {
    throw new Error(`Status is being used in ${statusCount} tickets.`);
  }

  await prisma.status.delete({
    where: {
      id: id,
    },
  });
};
