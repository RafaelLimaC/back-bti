import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.status.createMany({
    data: [
      { name: "Não iniciado", acronym: "NOT_STARTED" },
      { name: "Em andamento", acronym: "IN_PROGRESS" },
      { name: "Concluído", acronym: "COMPLETED" },
      { name: "Bloqueado", acronym: "BLOCKED" },
    ],
  });

  await prisma.owner.createMany({
    data: [
      { name: "João", role: "developer senior" },
      { name: "Maria", role: "developer pleno" },
      { name: "José", role: "developer junior" },
    ],
  });

  await prisma.sector.createMany({
    data: [
      { name: "TI" },
      { name: "Negócios" },
    ],
  });

  const sectors = await prisma.sector.findMany();

  await prisma.creator.createMany({
    data: [
      { name: "Carlos", role: "manager", sectorId: sectors[0].id },
      { name: "Ana", role: "product owner", sectorId: sectors[1].id },
    ],
  });

  const statuses = await prisma.status.findMany();
  const owners = await prisma.owner.findMany();
  const creators = await prisma.creator.findMany();

  await prisma.ticket.createMany({
    data: [
      {
        title: "Corrigir bug na tela de login",
        description: "Usuários não conseguem fazer login após atualização.",
        statusId: statuses[0].id,
      },
      {
        title: "Implementar nova API de pagamentos",
        description: "Nova integração com o gateway de pagamentos Stripe.",
        statusId: statuses[1].id,
      },
      {
        title: "Melhorar desempenho do banco de dados",
        description: "O sistema está lento devido a consultas pesadas.",
        statusId: statuses[2].id,
      },
    ],
  });

  const tickets = await prisma.ticket.findMany();

  await prisma.ticketOwner.createMany({
    data: [
      { ticketId: tickets[0].id, ownerId: owners[0].id },
      { ticketId: tickets[1].id, ownerId: owners[1].id },
      { ticketId: tickets[2].id, ownerId: owners[2].id },
    ],
  });

  await prisma.ticketCreator.createMany({
    data: [
      { ticketId: tickets[0].id, creatorId: creators[0].id },
      { ticketId: tickets[1].id, creatorId: creators[1].id },
      { ticketId: tickets[2].id, creatorId: creators[0].id },
    ],
  });

  await prisma.comment.createMany({
    data: [
      { ownerId: owners[0].id, ticketId: tickets[0].id, content: "Já estou corrigindo este problema." },
      { ownerId: owners[1].id, ticketId: tickets[1].id, content: "Estou aguardando o acesso à API." },
      { ownerId: owners[2].id, ticketId: tickets[2].id, content: "Preciso de mais informações sobre o problema." },
    ],
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
