import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ExchangeRatesService } from '../exchange-rates/exchange-rates.service';

async function bootstrap() {
  console.log('--- Binance Sync Script Started ---');
  
  // Create application context (no HTTP server)
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(ExchangeRatesService);
  
  try {
    const result = await service.syncBinancePriceToHistory();
    console.log(`Successfully synced Binance price: ${result.price}`);
  } catch (error) {
    console.error('Failed to sync Binance price:', error.message);
    process.exit(1);
  } finally {
    await app.close();
    console.log('--- Binance Sync Script Finished ---');
  }
}

bootstrap();
