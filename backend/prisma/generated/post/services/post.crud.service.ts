/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class PostCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.PostFindManyArgs): Promise<Post[] | null> {
    try {
      return await this.prismaService.post.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Post | null> {
    try {
      return await this.prismaService.post.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.PostCreateInput): Promise<Post | null> {
    try {
      return await this.prismaService.post.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(id: string, data: Prisma.PostUpdateInput): Promise<Post | null> {
    try {
      return await this.prismaService.post.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Post | null> {
    try {
      return await this.prismaService.post.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.PostCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.post.count(filter);
    } catch (e) {
      return null;
    }
  }
}
