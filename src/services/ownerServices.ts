import { prisma } from '@/config/prisma';

export const createOwnerService = async (name: string, role: string) => {
  const newOwner = await prisma.owner.create({
    data: {
      name: name,
      role: role,
    },
  });

  return newOwner;
};

export const getOwnerService = async () => {
  const owner = await prisma.owner.findMany();

  return owner;
};

export const updateOwnerService = async (
  name: string,
  role: string,
  id: number,
) => {
  if (!(await prisma.owner.findUnique({ where: { id: id } }))) {
    throw new Error('Owner not found');
  }

  const updatedOwner = await prisma.owner.update({
    data: {
      name: name,
      role: role,
    },
    where: {
      id: Number(id),
    },
  });

  return updatedOwner;
};

export const deleteOwnerService = async (id: number) => {
  if (!(await prisma.owner.findUnique({ where: { id: id } }))) {
    throw new Error('Owner not found');
  }

  await prisma.owner.delete({
    where: {
      id,
    },
  });
};
