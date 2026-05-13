import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { UpdateBcvRatesDto } from './dto/update-bcv-rates.dto';
import { BinanceP2PProvider } from './providers/binance-p2p.provider';
import { BcvProvider } from './providers/bcv.provider';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExchangeRatesService {
  private readonly logger = new Logger(ExchangeRatesService.name);

  constructor(
    private readonly binanceProvider: BinanceP2PProvider,
    private readonly bcvProvider: BcvProvider,
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    const symbols = ['USD', 'EUR', 'USDT'];
    
    // Fetch the latest entry for each symbol
    const latestRates = await Promise.all(
      symbols.map(async (symbol) => {
        return this.prisma.exchangeRate.findFirst({
          where: { symbol },
          orderBy: { createdAt: 'desc' },
        });
      })
    );

    const rates = latestRates.filter(r => r !== null);

    const latestUpdate = rates.length > 0
      ? rates.reduce((prev, current) => 
          prev.createdAt > current.createdAt ? prev : current
        ).createdAt
      : new Date();

    return {
      rates: rates.map(rate => ({
        id: rate.id,
        label: rate.symbol,
        value: rate.value.toString().replace('.', ','),
        currency: rate.currency,
      })),
      lastUpdate: latestUpdate.toISOString(),
    };
  }

  async updateBcvRates(updateBcvRatesDto: UpdateBcvRatesDto) {
    const { usd, eur } = updateBcvRatesDto;

    const newEntries = [
      {
        symbol: 'USD',
        label: 'Dólar BCV',
        value: usd,
        provider: 'BCV',
        currency: 'VES',
      },
      {
        symbol: 'EUR',
        label: 'Euro BCV',
        value: eur,
        provider: 'BCV',
        currency: 'VES',
      },
    ];

    await this.prisma.exchangeRate.createMany({
      data: newEntries,
    });

    return { message: 'BCV rates saved successfully (historical entry)' };
  }

  async syncBcvRates() {
    this.logger.log('Starting BCV rates sync');
    try {
      const rates = await this.bcvProvider.getRates();
      
      const newEntries = [
        {
          symbol: 'USD',
          label: 'Dólar BCV',
          value: rates.usd,
          provider: 'BCV',
          currency: 'VES',
        },
        {
          symbol: 'EUR',
          label: 'Euro BCV',
          value: rates.eur,
          provider: 'BCV',
          currency: 'VES',
        },
      ];

      await this.prisma.exchangeRate.createMany({
        data: newEntries,
      });

      this.logger.log('Successfully synced BCV rates');
      return rates;
    } catch (error) {
      this.logger.error(`Failed to sync BCV rates: ${error.message}`);
      throw error;
    }
  }

  // ... other methods ...
  create(createExchangeRateDto: CreateExchangeRateDto) {
    return 'This action adds a new exchangeRate';
  }

  findOne(id: number) {
    return `This action returns a #${id} exchangeRate`;
  }

  update(id: number, updateExchangeRateDto: UpdateExchangeRateDto) {
    return `This action updates a #${id} exchangeRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchangeRate`;
  }

  async getBinanceAverage(asset: string, fiat: string, tradeType: string, updateDb: boolean = false) {
    const price = await this.binanceProvider.getAveragePrice(asset, fiat, tradeType);
    
    // Update DB only if explicitly requested
    if (updateDb && asset === 'USDT' && fiat === 'VES') {
      await this.prisma.exchangeRate.create({
        data: {
          symbol: 'USDT',
          label: 'Binance USDT',
          value: price,
          provider: 'Binance',
          currency: 'VES'
        }
      });
    }

    return { average: price.toString() };
  }

  async syncBinancePriceToHistory(asset: string = 'USDT', fiat: string = 'VES', tradeType: string = 'SELL') {
    this.logger.log(`Starting Binance sync for ${asset}/${fiat} (${tradeType})`);
    
    try {
      const price = await this.binanceProvider.getAveragePrice(asset, fiat, tradeType);
      
      if (price <= 0) {
        throw new Error('Received invalid price from Binance');
      }

      await this.prisma.exchangeRate.create({
        data: {
          symbol: asset,
          label: `Binance ${asset}`,
          value: price,
          provider: 'Binance',
          currency: fiat,
        },
      });

      this.logger.log(`Successfully synced Binance price: ${price}`);
      return { price };
    } catch (error) {
      this.logger.error(`Failed to sync Binance price: ${error.message}`);
      throw error;
    }
  }

  async getHistory(days: number = 7) {
    const symbols = ['USD', 'EUR', 'USDT'];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const historyData = await Promise.all(
      symbols.map(async (symbol) => {
        const data = await this.prisma.exchangeRate.findMany({
          where: {
            symbol,
            createdAt: {
              gte: startDate,
            },
          },
          select: {
            value: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        let history = data.map((item) => ({
          value: Number(item.value),
          date: item.createdAt.toISOString(),
        }));

        if (symbol === 'USDT') {
          const dailyAverages = data.reduce((acc, item) => {
            const dateStr = item.createdAt.toISOString().split('T')[0];
            if (!acc[dateStr]) {
              acc[dateStr] = { sum: 0, count: 0 };
            }
            acc[dateStr].sum += Number(item.value);
            acc[dateStr].count += 1;
            return acc;
          }, {} as Record<string, { sum: number; count: number }>);

          history = Object.keys(dailyAverages).map((dateStr) => ({
            value: Number((dailyAverages[dateStr].sum / dailyAverages[dateStr].count).toFixed(2)),
            date: `${dateStr}T00:00:00.000Z`,
          })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }

        const currentPrice = data.length > 0 ? Number(data[data.length - 1].value) : 0;
        const initialPrice = data.length > 0 ? Number(data[0].value) : 0;
        const change = initialPrice !== 0 ? ((currentPrice - initialPrice) / initialPrice) * 100 : 0;

        return {
          symbol,
          currentPrice,
          change: parseFloat(change.toFixed(2)),
          history,
        };
      })
    );

    return historyData;
  }
}
