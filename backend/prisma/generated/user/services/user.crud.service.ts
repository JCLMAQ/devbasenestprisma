/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class UserCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.UserFindManyArgs): Promise<User[] | null> {
    try {
      return await this.prismaService.user.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      return await this.prismaService.user.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User | null> {
    try {
      return await this.prismaService.user.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    try {
      return await this.prismaService.user.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      return await this.prismaService.user.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.UserCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.user.count(filter);
    } catch (e) {
      return null;
    }
  }
}
