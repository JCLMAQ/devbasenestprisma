import { Prisma } from '@prisma/client'

export class UserBis {}

export type UserBisPersonalData = Prisma.UserBisGetPayload<{
    select: {
        id: true;
        email: true;
        lastName: true;
        firstName: true;
        nickName: true
        createdAt: true;
        updatedAt: true;
        Role: true;
        Gender: true;
        pwdHash: false;
        salt: false;
        social: true;
        language: true;
        managerId: true;
        profile: true;
        
    }
}>