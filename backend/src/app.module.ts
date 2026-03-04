import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { SupabaseModule } from './supabase/supabase.module';
import { BuildsModule } from './builds/builds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    ExchangeRatesModule,
    BuildsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
