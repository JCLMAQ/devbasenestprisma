/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class TokenCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.TokenFindManyArgs): Promise<Token[] | null> {
    try {
      return await this.prismaService.token.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Token | null> {
    try {
      return await this.prismaService.token.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.TokenCreateInput): Promise<Token | null> {
    try {
      return await this.prismaService.token.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.TokenUpdateInput,
  ): Promise<Token | null> {
    try {
      return await this.prismaService.token.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Token | null> {
    try {
      return await this.prismaService.token.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.TokenCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.token.count(filter);
    } catch (e) {
      return null;
    }
  }
}
