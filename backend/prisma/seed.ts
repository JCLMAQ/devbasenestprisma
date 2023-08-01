import { faker } from '@faker-js/faker';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();


// async function main() {
//     for ( let user of users) {
//         await prisma.user.create({
//             data: user
//         })
//     }
// }

const data = Array.from({ length: 10 }).map(()=> ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    Roles: [Role.USER]

}))

// const data = Array.from( users );
async function main() {
   await prisma.user.createMany({
            data
        })
}
main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally( () => {
    prisma.$disconnect()
})