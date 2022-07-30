/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class CommentCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.CommentFindManyArgs): Promise<Comment[] | null> {
    try {
      return await this.prismaService.comment.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Comment | null> {
    try {
      return await this.prismaService.comment.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.CommentCreateInput): Promise<Comment | null> {
    try {
      return await this.prismaService.comment.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.CommentUpdateInput,
  ): Promise<Comment | null> {
    try {
      return await this.prismaService.comment.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Comment | null> {
    try {
      return await this.prismaService.comment.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.CommentCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.comment.count(filter);
    } catch (e) {
      return null;
    }
  }
}
