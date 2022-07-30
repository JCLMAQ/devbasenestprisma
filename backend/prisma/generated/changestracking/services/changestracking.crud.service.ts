/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, ChangesTracking } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class ChangesTrackingCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    filter?: Prisma.ChangesTrackingFindManyArgs,
  ): Promise<ChangesTracking[] | null> {
    try {
      return await this.prismaService.changestracking.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<ChangesTracking | null> {
    try {
      return await this.prismaService.changestracking.findUnique({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async create(
    data: Prisma.ChangesTrackingCreateInput,
  ): Promise<ChangesTracking | null> {
    try {
      return await this.prismaService.changestracking.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.ChangesTrackingUpdateInput,
  ): Promise<ChangesTracking | null> {
    try {
      return await this.prismaService.changestracking.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<ChangesTracking | null> {
    try {
      return await this.prismaService.changestracking.delete({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async count(
    filter?: Prisma.ChangesTrackingCountArgs,
  ): Promise<number | null> {
    try {
      return await this.prismaService.changestracking.count(filter);
    } catch (e) {
      return null;
    }
  }
}
