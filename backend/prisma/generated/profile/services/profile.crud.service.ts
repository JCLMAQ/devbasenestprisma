/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from '@prisma-utils/nestjs-prisma';

@Injectable()
export class ProfileCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter?: Prisma.ProfileFindManyArgs): Promise<Profile[] | null> {
    try {
      return await this.prismaService.profile.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<Profile | null> {
    try {
      return await this.prismaService.profile.findUnique({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async create(data: Prisma.ProfileCreateInput): Promise<Profile | null> {
    try {
      return await this.prismaService.profile.create({ data: data });
    } catch (e) {
      return null;
    }
  }

  async update(
    id: string,
    data: Prisma.ProfileUpdateInput,
  ): Promise<Profile | null> {
    try {
      return await this.prismaService.profile.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<Profile | null> {
    try {
      return await this.prismaService.profile.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.ProfileCountArgs): Promise<number | null> {
    try {
      return await this.prismaService.profile.count(filter);
    } catch (e) {
      return null;
    }
  }
}
