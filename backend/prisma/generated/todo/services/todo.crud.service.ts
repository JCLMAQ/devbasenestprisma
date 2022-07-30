/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class TodoCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.TodoFindManyArgs): Promise<Todo[] | null> {
    try {
      return await this.prismaService.todo.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Todo | null> {
    try {
      return await this.prismaService.todo.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo | null> {
    try {
      return await this.prismaService.todo.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo | null> {
    try {
      return await this.prismaService.todo.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Todo | null> {
    try {
      return await this.prismaService.todo.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.TodoCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.todo.count(filter);
    } catch (e) {
      return null;
    }
  }
}
