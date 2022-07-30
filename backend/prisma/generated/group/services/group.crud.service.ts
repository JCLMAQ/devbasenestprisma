/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Group } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class GroupCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.GroupFindManyArgs): Promise<Group[] | null> {
    try {
      return await this.prismaService.group.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Group | null> {
    try {
      return await this.prismaService.group.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.GroupCreateInput): Promise<Group | null> {
    try {
      return await this.prismaService.group.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.GroupUpdateInput,
  ): Promise<Group | null> {
    try {
      return await this.prismaService.group.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Group | null> {
    try {
      return await this.prismaService.group.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.GroupCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.group.count(filter);
    } catch (e) {
      return null;
    }
  }
}
