/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class CategoryCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    filter?: Prisma.CategoryFindManyArgs,
  ): Promise<Category[] | null> {
    try {
      return await this.prismaService.category.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Category | null> {
    try {
      return await this.prismaService.category.findUnique({
        where: { id: id },
      });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category | null> {
    try {
      return await this.prismaService.category.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category | null> {
    try {
      return await this.prismaService.category.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Category | null> {
    try {
      return await this.prismaService.category.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.CategoryCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.category.count(filter);
    } catch (e) {
      return null;
    }
  }
}
