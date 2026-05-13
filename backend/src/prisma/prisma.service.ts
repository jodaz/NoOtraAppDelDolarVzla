import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from "@prisma/adapter-neon";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    const connectionString = config.get<string>('DATABASE_URL');
    const adapter = new PrismaNeon({ connectionString });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Successfully connected to Neon via standard Prisma Client');
    } catch (e) {
      console.error('Prisma Connection Error:', e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}