import { prisma } from '@/config/prisma';

export const createOwnerService = async (input: {
  name: string;
  role: string;
}) => {
  const { name, role } = input;

  const newOwner = await prisma.owner.create({
    data: {
      name,
      role,
    },
  });

  return newOwner;
};

export const getOwnerService = async () => {
  const owner = await prisma.owner.findMany();

  return owner;
};

export const updateOwnerService = async (input: {
  name: string;
  role: string;
  id: number;
}) => {
  const { name, role, id } = input;

  if (!(await prisma.owner.findUnique({ where: { id } }))) {
    throw new Error('Owner not found');
  }

  const updatedOwner = await prisma.owner.update({
    data: {
      name,
      role,
    },
    where: {
      id,
    },
  });

  return updatedOwner;
};

export const deleteOwnerService = async (id: number) => {
  const ownerExists = await prisma.owner.findUnique({ where: { id } });

  if (!ownerExists) {
    throw new Error('Owner not found');
  }

  await prisma.owner.delete({
    where: {
      id,
    },
  });
};
