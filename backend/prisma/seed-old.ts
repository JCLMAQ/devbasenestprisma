import { PrismaClient, Role } from '@prisma/client';


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
      Roles: [Role.USER]
    },
  })

  await prismaClient.user.create({
    data: {
      firstName: 'bob',
      lastName: 'Morane',
      email: 'bob@prisma.io',
      nickName: 'MOBOB',
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
      Roles: [Role.USER]
    },
  })

  await prismaClient.user.createMany({
    data: [
      {
        firstName: 'Moi',
        lastName: 'MAQ',
        email: 'jcm@jcm.be',
        nickName: 'JCM',
        Roles: [Role.USER]
      },
      {
        firstName: 'Toi',
        lastName: 'TOIT',
        email: 'toi@toit.be',
        nickName: 'TOITOI',
        Roles: [Role.USER]
      },
      {
        firstName: 'Toto',
        lastName: 'THE BEST',
        email: 'toto@toto.be',
        nickName: 'TOTO',
        Roles: [Role.USER]
      },
      {
        firstName: 'Best',
        lastName: 'TOTO',
        email: 'best@toto.be',
        nickName: 'BTOTO',
        Roles: [Role.USER]
      },
    ]
  })


  await prismaClient.configParam.createMany({
    data: [
      {
      name: 'EMAIL_DELAY_BTW_ENABLE',
      value: '1',
      utility: 'Activate limitation of asking email repeatedly.'
      },
      {
        name: 'EMAIL_DELAY_BTW',
        value: '10m',
        utility: 'Delay between two email sending'
      },
      {
        name: 'EMAIL_LIMIT_DOMAIN',
        value: '1',
        utility: 'Email domain limitation.'
      },
      {
        name: 'EMAIL_HOST',
        value: 'localhost',
        utility: 'Email host domain.'
      },
      {
        name: 'EMAIL_PORT',
        value: '1025',
        utility: 'Email host port.'
      },
      {
        name: 'EMAIL_NOREPLY',
        value: 'project.1@$localhost',
        utility: 'No-reply email address.'
      },
      {
        name: 'EMAIL_NOREPLY_PWD',
        value: 'secret.1',
        utility: 'No-reply email password.'
      },
      {
        name: 'EMAIL_TOKEN_EXPIRATION',
        value: '10m',
        utility: 'Expiration delay for the email token.'
      },
      {
        name: 'FORGOTPWD_TOKEN_EXPIRATION',
        value: '10m',
        utility: 'Expiration delay for the forgot paswword token.'
      },
      {
        name: 'JWT_LOGOUT_ENABLE',
        value: '1',
        utility: 'Enable JWT cancelation when logout (! nedd an access to the DB each time, JWT is send to the backend).'
      },
      {
        name: 'JWT_VALIDITY_DURATION',
        value: '60s',
        utility: 'Validity duration of the JWT token.'
      },
      {
        name: 'FILES_STORAGE_DEST',
        value: './uploadedfiles',
        utility: '! Not used for now - URL for the files storage location.'
      },
      {
        name: 'IMAGES_STORAGE_DEST',
        value: './uploadedimages',
        utility: " ! Not used for now - URL for the files storage location."
      },
      {
        name: 'IMAGES_TEMP_STORAGE_DEST',
        value: './uploadedtempimages',
        utility: " ! Not used for now - URL for the files storage location."
      }
    ]
  })
  await prismaClient.emaildomain.createMany({
    data:[ {
      domain: 'test.be',
      allowed: true
      },
      {
        domain: 'gmail.com',
        allowed: true
      },
      {
        domain: 'outlook.be',
        allowed: false
      }
    ]
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect()
  })