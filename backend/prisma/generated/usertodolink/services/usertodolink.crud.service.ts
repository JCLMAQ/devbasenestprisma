/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, UserTodoLink } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class UserTodoLinkCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    filter?: Prisma.UserTodoLinkFindManyArgs,
  ): Promise<UserTodoLink[] | null> {
    try {
      return await this.prismaService.usertodolink.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<UserTodoLink | null> {
    try {
      return await this.prismaService.usertodolink.findUnique({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async create(
    data: Prisma.UserTodoLinkCreateInput,
  ): Promise<UserTodoLink | null> {
    try {
      return await this.prismaService.usertodolink.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.UserTodoLinkUpdateInput,
  ): Promise<UserTodoLink | null> {
    try {
      return await this.prismaService.usertodolink.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<UserTodoLink | null> {
    try {
      return await this.prismaService.usertodolink.delete({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.UserTodoLinkCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.usertodolink.count(filter);
    } catch (e) {
      return null;
    }
  }
}
