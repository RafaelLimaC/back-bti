import { prisma } from '@/config/prisma';

export const createCreatorService = async (input: {
  name: string;
  role: string | undefined;
  sectorId: number;
}) => {
  const { name, role, sectorId } = input;

  const newCreator = await prisma.creator.create({
    data: {
      name,
      role,
      sectorId,
    },
    include: {
      Sector: true,
    },
    omit: {
      sectorId: true,
    },
  });

  return newCreator;
};

export const getCreatorsService = async () => {
  const creator = await prisma.creator.findMany({
    include: {
      Sector: true,
    },
    omit: {
      sectorId: true,
    },
  });

  return creator;
};

export const updateCreatorService = async (input: {
  name: string;
  role: string;
  sectorId: number;
  id: number;
}) => {
  const { name, role, sectorId, id } = input;

  if (!(await prisma.creator.findUnique({ where: { id } }))) {
    throw new Error('Creator not found');
  }

  const updatedCreator = await prisma.creator.update({
    data: {
      name,
      role,
      sectorId,
    },
    where: {
      id: Number(id),
    },
    include: {
      Sector: true,
    },
    omit: {
      sectorId: true,
    },
  });

  return updatedCreator;
};

export const deleteCreatorService = async (id: number) => {
  const creatorExists = await prisma.creator.findUnique({ where: { id } });

  if (!creatorExists) {
    throw new Error('Creator not found');
  }

  await prisma.creator.delete({
    where: {
      id,
    },
  });
};
