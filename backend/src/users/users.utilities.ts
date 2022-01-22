

// Exclude keys from user
export function exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }
  // Example of use : 
  /*
  const user = await prisma.user.findUnique({ where: 1 })
  const userWithoutPassword = exclude(user, 'password')
  */