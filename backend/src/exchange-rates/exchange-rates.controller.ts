import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { UpdateBcvRatesDto } from './dto/update-bcv-rates.dto';

@ApiTags('Exchange Rates')
@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exchange rate entry (Manual)' })
  create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return this.exchangeRatesService.create(createExchangeRateDto);
  }

  @Post('bcv')
  @ApiOperation({ summary: 'Update BCV rates manually' })
  @ApiResponse({ status: 201, description: 'BCV rates updated successfully' })
  updateBcv(@Body() updateBcvRatesDto: UpdateBcvRatesDto) {
    return this.exchangeRatesService.updateBcvRates(updateBcvRatesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all latest exchange rates' })
  findAll() {
    return this.exchangeRatesService.findAll();
  }

  @Get('history')
  @ApiOperation({ summary: 'Get historical exchange rates' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days of history to fetch', example: 7 })
  getHistory(@Query('days') days: string) {
    return this.exchangeRatesService.getHistory(days ? parseInt(days) : 7);
  }

  @Get('binance/average')
  @ApiOperation({ summary: 'Get average price from Binance P2P' })
  @ApiQuery({ name: 'asset', required: false, description: 'Crypto asset (e.g., USDT)', example: 'USDT' })
  @ApiQuery({ name: 'fiat', required: false, description: 'Fiat currency (e.g., VES)', example: 'VES' })
  @ApiQuery({ name: 'tradeType', required: false, description: 'Trade type (BUY or SELL)', example: 'SELL' })
  @ApiQuery({ name: 'update', required: false, description: 'Whether to update the database with the result', example: 'false' })
  getBinanceAverage(
    @Query('asset') asset: string,
    @Query('fiat') fiat: string,
    @Query('tradeType') tradeType: string,
    @Query('update') update: string,
  ) {
    return this.exchangeRatesService.getBinanceAverage(
      asset || 'USDT',
      fiat || 'VES',
      tradeType || 'SELL',
      update === 'false',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exchange rate entry by ID' })
  @ApiParam({ name: 'id', description: 'Exchange rate ID' })
  findOne(@Param('id') id: string) {
    return this.exchangeRatesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an exchange rate entry by ID' })
  @ApiParam({ name: 'id', description: 'Exchange rate ID' })
  update(@Param('id') id: string, @Body() updateExchangeRateDto: UpdateExchangeRateDto) {
    return this.exchangeRatesService.update(+id, updateExchangeRateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exchange rate entry by ID' })
  @ApiParam({ name: 'id', description: 'Exchange rate ID' })
  remove(@Param('id') id: string) {
    return this.exchangeRatesService.remove(+id);
  }
}
