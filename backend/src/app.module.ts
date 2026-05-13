import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { PrismaModule } from './prisma/prisma.module';
import { BuildsModule } from './builds/builds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ExchangeRatesModule,
    BuildsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
