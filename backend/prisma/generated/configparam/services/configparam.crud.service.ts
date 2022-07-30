/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, ConfigParam } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class ConfigParamCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    filter?: Prisma.ConfigParamFindManyArgs,
  ): Promise<ConfigParam[] | null> {
    try {
      return await this.prismaService.configparam.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<ConfigParam | null> {
    try {
      return await this.prismaService.configparam.findUnique({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async create(
    data: Prisma.ConfigParamCreateInput,
  ): Promise<ConfigParam | null> {
    try {
      return await this.prismaService.configparam.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.ConfigParamUpdateInput,
  ): Promise<ConfigParam | null> {
    try {
      return await this.prismaService.configparam.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<ConfigParam | null> {
    try {
      return await this.prismaService.configparam.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.ConfigParamCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.configparam.count(filter);
    } catch (e) {
      return null;
    }
  }
}
