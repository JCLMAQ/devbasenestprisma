import { Prisma } from '@prisma/client'

export class User {}

export type UserPersonalData = Prisma.UserGetPayload<{
    select: {
        id: true;
        createdAt: true;
        updatedAt: true;
        email: true;
        Roles: true;
        nickName: true;
        lastName: true;
        firstName: true;
        title: true;
        address: true;
        Gender: true;
        salt: false;
        pwdHash: false;
        dob: true;
        isDeleted: true;
    }
}>