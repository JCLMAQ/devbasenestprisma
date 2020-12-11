import { PrismaClient } from '@prisma/client';


const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.user.create({
    data: {
      email: 'alice@prisma.io',
      firstName: 'alice',
      lastName: 'Merveille',
      Post: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
    },
  })

  await prismaClient.user.create({
    data: {
      firstName: 'bob',
      lastName: 'Morane',
      email: 'bob@prisma.io',
      Post: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
  })

  await prismaClient.apparam.create({
    data: {
      name: 'DELAY_BTW_EMAIL_ENABLE',
      value: '1',
      utility: 'Activate limitation of asking email repeatedly.'
    }
  })
  await prismaClient.apparam.create({
    data: {
      name: 'DELAY_BTW_EMAIL',
      value: '10m',
      utility: 'Delay between two email sending'
    }
  })
  await prismaClient.apparam.create({
    data: {
      name: 'EMAIL_LIMIT_DOMAIN',
      value: '1',
      utility: 'Email domain limitation.'
    }
  })
  await prismaClient.apparam.create({
    data: {
      name: 'EMAIL_HOST',
      value: 'localhost',
      utility: 'Email host domain.'
    }
  })
  await prismaClient.apparam.create({
    data: {
      name: 'EMAIL_PORT',
      value: '1025',
      utility: 'Email host port.'
    }
  })
  
  await prismaClient.apparam.create({
    data: {
      name: 'EMAIL_NOREPLY_PWD',
      value: 'secret.1',
      utility: 'No-reply email password.'
    }
  })

  await prismaClient.emaildomain.create({
    data: {
      domain: 'test.be',
      allowed: true
    }
  })
  await prismaClient.emaildomain.create({
    data: {
      domain: 'gmail.com',
      allowed: true
    }
  })
  await prismaClient.emaildomain.create({
    data: {
      domain: 'outlook.be',
      allowed: false
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect()
  })