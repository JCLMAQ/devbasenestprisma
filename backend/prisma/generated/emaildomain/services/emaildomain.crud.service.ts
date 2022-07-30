/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Emaildomain } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class EmaildomainCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    filter?: Prisma.EmaildomainFindManyArgs,
  ): Promise<Emaildomain[] | null> {
    try {
      return await this.prismaService.emaildomain.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Emaildomain | null> {
    try {
      return await this.prismaService.emaildomain.findUnique({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async create(
    data: Prisma.EmaildomainCreateInput,
  ): Promise<Emaildomain | null> {
    try {
      return await this.prismaService.emaildomain.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.EmaildomainUpdateInput,
  ): Promise<Emaildomain | null> {
    try {
      return await this.prismaService.emaildomain.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Emaildomain | null> {
    try {
      return await this.prismaService.emaildomain.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.EmaildomainCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.emaildomain.count(filter);
    } catch (e) {
      return null;
    }
  }
}
