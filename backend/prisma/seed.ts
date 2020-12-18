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

  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_DELAY_BTW_ENABLE',
      value: '1',
      utility: 'Activate limitation of asking email repeatedly.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_DELAY_BTW',
      value: '10m',
      utility: 'Delay between two email sending'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_LIMIT_DOMAIN',
      value: '1',
      utility: 'Email domain limitation.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_HOST',
      value: 'localhost',
      utility: 'Email host domain.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_PORT',
      value: '1025',
      utility: 'Email host port.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_NOREPLY',
      value: 'project.1@$localhost',
      utility: 'No-reply email address.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_NOREPLY_PWD',
      value: 'secret.1',
      utility: 'No-reply email password.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'EMAIL_TOKEN_EXPIRATION',
      value: '10m',
      utility: 'Expiration delay for the email token.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'FORGOTPWD_TOKEN_EXPIRATION',
      value: '10m',
      utility: 'Expiration delay for the forgot paswword token.'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'JWT_LOGOUT_ENABLE',
      value: '1',
      utility: 'Enable JWT cancelation when logout (! nedd an access to the DB each time, JWT is send to the backend).'
    }
  })
  await prismaClient.configParam.create({
    data: {
      name: 'JWT_VALIDITY_DURATION',
      value: '60s',
      utility: 'Validity duration of the JWT token.'
    }
  })

  await prismaClient.configParam.create({
    data: {
      name: 'FILES_STORAGE_DEST',
      value: './uploadedfiles',
      utility: '! Not used for now - URL for the files storage location.'
    }
  })

  await prismaClient.configParam.create({
    data: {
      name: 'IMAGESS_STORAGE_DEST',
      value: './uploadedfiles',
      utility: " ! Not used for now - URL for the files storage location."
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