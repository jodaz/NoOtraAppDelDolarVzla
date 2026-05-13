import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildDto } from './dto/create-build.dto';

@Injectable()
export class BuildsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.build.findMany({
      select: {
        url: true,
        version: true,
        platform: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(createBuildDto: CreateBuildDto) {
    return this.prisma.build.create({
      data: createBuildDto,
    });
  }
}
