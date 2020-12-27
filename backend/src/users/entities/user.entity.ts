import { Prisma } from '@prisma/client'

export class User {}

export type UserPersonalData = Prisma.UserGetPayload<{
    select: {
        id: true;
        createdAt: true;
        updatedAt: true;
        email: true;
        Role: true;
        nickName: true;
        lastName: true;
        firstName: true;
        Gender: true;
        salt: false;
        pwdHash: false;
    }
}>