import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { UpdateBcvRatesDto } from './dto/update-bcv-rates.dto';

@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Post()
  create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return this.exchangeRatesService.create(createExchangeRateDto);
  }

  @Post('bcv')
  updateBcv(@Body() updateBcvRatesDto: UpdateBcvRatesDto) {
    return this.exchangeRatesService.updateBcvRates(updateBcvRatesDto);
  }

  @Get()
  findAll() {
    return this.exchangeRatesService.findAll();
  }

  @Get('binance/average')
  getBinanceAverage(
    @Query('asset') asset: string,
    @Query('fiat') fiat: string,
    @Query('tradeType') tradeType: string,
  ) {
    return this.exchangeRatesService.getBinanceAverage(
      asset || 'USDT',
      fiat || 'VES',
      tradeType || 'SELL',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeRatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExchangeRateDto: UpdateExchangeRateDto) {
    return this.exchangeRatesService.update(+id, updateExchangeRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeRatesService.remove(+id);
  }
}
