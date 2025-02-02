import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.status.createMany({
    data: [
      { name: 'Não iniciado', acronym: 'NOT_STARTED' },
      { name: 'Em andamento', acronym: 'IN_PROGRESS' },
      { name: 'Concluído', acronym: 'COMPLETED' },
      { name: 'Bloqueado', acronym: 'BLOCKED' },
    ],
  });

  await prisma.owner.createMany({
    data: [
      { name: 'João', role: 'developer senior' },
      { name: 'Maria', role: 'developer pleno' },
      { name: 'José', role: 'developer junior' },
      { name: 'Ana', role: 'developer senior' },
      { name: 'Carlos', role: 'developer pleno' },
    ],
  });

  await prisma.sector.createMany({
    data: [
      { name: 'Back Office TI', acronym: 'BACK_OFFICE_TI' },
      { name: 'Media Transfer', acronym: 'MEDIA_TRANSFER' },
      { name: 'Criação e Design', acronym: 'CRIACAO_DESIGN' },
    ],
  });

  const sectors = await prisma.sector.findMany();

  await prisma.creator.createMany({
    data: [
      { name: 'Carlos', role: 'manager', sectorId: sectors[0].id },
      { name: 'Ana', role: 'product owner', sectorId: sectors[1].id },
      { name: 'Pedro', role: 'team lead', sectorId: sectors[2].id },
    ],
  });

  const statuses = await prisma.status.findMany();
  const owners = await prisma.owner.findMany();
  const creators = await prisma.creator.findMany();

  await prisma.ticket.createMany({
    data: [
      {
        title: 'Corrigir bug na tela de login',
        description: 'Usuários não conseguem fazer login após atualização.',
        statusId: statuses[0].id,
      },
      {
        title: 'Implementar nova API de pagamentos',
        description: 'Nova integração com o gateway de pagamentos Stripe.',
        statusId: statuses[1].id,
      },
      {
        title: 'Melhorar desempenho do banco de dados',
        description: 'O sistema está lento devido a consultas pesadas.',
        statusId: statuses[2].id,
      },
      {
        title: 'Atualizar documentação do projeto',
        description:
          'A documentação precisa ser atualizada com as novas funcionalidades.',
        statusId: statuses[3].id,
      },
      {
        title: 'Desenvolver nova funcionalidade de relatórios',
        description: 'Criar novos relatórios para análise de dados.',
        statusId: statuses[0].id,
      },
      {
        title: 'Refatorar código legado',
        description: 'Melhorar a qualidade do código antigo.',
        statusId: statuses[1].id,
      },
    ],
  });

  const tickets = await prisma.ticket.findMany();

  await prisma.ticketOwner.createMany({
    data: [
      { ticketId: tickets[0].id, ownerId: owners[0].id },
      { ticketId: tickets[0].id, ownerId: owners[1].id },
      { ticketId: tickets[1].id, ownerId: owners[1].id },
      { ticketId: tickets[1].id, ownerId: owners[2].id },
      { ticketId: tickets[2].id, ownerId: owners[2].id },
      { ticketId: tickets[3].id, ownerId: owners[0].id },
      { ticketId: tickets[3].id, ownerId: owners[2].id },
      { ticketId: tickets[4].id, ownerId: owners[3].id },
      { ticketId: tickets[4].id, ownerId: owners[4].id },
      { ticketId: tickets[5].id, ownerId: owners[4].id },
    ],
  });

  await prisma.ticketCreator.createMany({
    data: [
      { ticketId: tickets[0].id, creatorId: creators[0].id },
      { ticketId: tickets[0].id, creatorId: creators[1].id },
      { ticketId: tickets[1].id, creatorId: creators[1].id },
      { ticketId: tickets[2].id, creatorId: creators[0].id },
      { ticketId: tickets[3].id, creatorId: creators[1].id },
      { ticketId: tickets[4].id, creatorId: creators[2].id },
      { ticketId: tickets[5].id, creatorId: creators[2].id },
    ],
  });

  await prisma.comment.createMany({
    data: [
      {
        ownerId: owners[0].id,
        ticketId: tickets[0].id,
        content: 'Já estou corrigindo este problema.',
      },
      {
        ownerId: owners[1].id,
        ticketId: tickets[0].id,
        content: 'Aguardando revisão.',
      },
      {
        ownerId: owners[1].id,
        ticketId: tickets[1].id,
        content: 'Estou aguardando o acesso à API.',
      },
      {
        ownerId: owners[2].id,
        ticketId: tickets[2].id,
        content: 'Preciso de mais informações sobre o problema.',
      },
      {
        ownerId: owners[0].id,
        ticketId: tickets[3].id,
        content: 'Atualização em andamento.',
      },
      {
        ownerId: owners[3].id,
        ticketId: tickets[4].id,
        content: 'Trabalhando na nova funcionalidade.',
      },
      {
        ownerId: owners[4].id,
        ticketId: tickets[5].id,
        content: 'Refatoração em progresso.',
      },
    ],
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
