import { prisma } from '@/config/prisma';

export class CreatorService {
  constructor() {}

  async createCreator(input: {
    name: string;
    role: string | undefined;
    sectorId: number;
  }) {
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
  }

  async getCreators() {
    const creator = await prisma.creator.findMany({
      include: {
        Sector: true,
      },
      omit: {
        sectorId: true,
      },
    });

    return creator;
  }

  async updateCreator(input: {
    name: string;
    role: string;
    sectorId: number;
    id: number;
  }) {
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
  }

  async deleteCreator(id: number) {
    const creatorExists = await prisma.creator.findUnique({ where: { id } });

    if (!creatorExists) {
      throw new Error('Creator not found');
    }

    await prisma.creator.delete({
      where: {
        id,
      },
    });
  }
}
