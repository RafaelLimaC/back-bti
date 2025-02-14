import { prisma } from '@/config/prisma';

export class OwnerService {
  constructor() {}

  async createOwner(input: { name: string; role: string }) {
    const { name, role } = input;

    const newOwner = await prisma.owner.create({
      data: {
        name,
        role,
      },
    });

    return newOwner;
  }

  async getOwner() {
    const owner = await prisma.owner.findMany();

    return owner;
  }

  async updateOwner(input: { name: string; role: string; id: number }) {
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
  }

  async deleteOwner(id: number) {
    const ownerExists = await prisma.owner.findUnique({ where: { id } });

    if (!ownerExists) {
      throw new Error('Owner not found');
    }

    await prisma.owner.delete({
      where: {
        id,
      },
    });
  }
}
