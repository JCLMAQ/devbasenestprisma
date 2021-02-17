import { Role } from "@prisma/client";

export const users = [
    {
        firstName: 'Moi',
        lastName: 'MAQ',
        email: 'jcm@jcm.be',
        nickName: 'JCM',
        Roles: Role.USER
    },
    {
        firstName: 'Toi',
        lastName: 'TOIT',
        email: 'toi@toit.be',
        nickName: 'TOITOI',
        Roles: Role.USER
    },
    {
        firstName: 'Toto',
        lastName: 'THE BEST',
        email: 'toto@toto.be',
        nickName: 'TOTO',
        Roles: Role.USER
    },
    {
        firstName: 'Best',
        lastName: 'TOTO',
        email: 'best@toto.be',
        nickName: 'BTOTO',
        Roles: Role.USER
    },
]

