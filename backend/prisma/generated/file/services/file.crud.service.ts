/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, File } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class FileCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.FileFindManyArgs): Promise<File[] | null> {
    try {
      return await this.prismaService.file.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<File | null> {
    try {
      return await this.prismaService.file.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.FileCreateInput): Promise<File | null> {
    try {
      return await this.prismaService.file.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(id: string, data: Prisma.FileUpdateInput): Promise<File | null> {
    try {
      return await this.prismaService.file.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<File | null> {
    try {
      return await this.prismaService.file.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.FileCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.file.count(filter);
    } catch (e) {
      return null;
    }
  }
}
