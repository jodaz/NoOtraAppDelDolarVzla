import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { UpdateBcvRatesDto } from './dto/update-bcv-rates.dto';
import { BinanceP2PProvider } from './providers/binance-p2p.provider';
import { BcvProvider } from './providers/bcv.provider';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ExchangeRatesService {
  private readonly logger = new Logger(ExchangeRatesService.name);

  constructor(
    private readonly binanceProvider: BinanceP2PProvider,
    private readonly bcvProvider: BcvProvider,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll() {
    const symbols = ['USD', 'EUR', 'USDT'];
    const client = this.supabaseService.getClient();
    
    // Fetch the latest entry for each symbol
    // In a production app with many symbols, an RPC or more complex query would be better.
    // For 3 symbols, this is efficient enough.
    const latestRates = await Promise.all(
      symbols.map(async (symbol) => {
        const { data, error } = await client
          .from('exchange_rates')
          .select('*')
          .eq('symbol', symbol)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows found'
          this.logger.error(`Error fetching latest rate for ${symbol}: ${error.message}`);
        }
        return data;
      })
    );

    const rates = latestRates.filter(r => r !== null);

    const latestUpdate = rates.length > 0
      ? rates.reduce((prev, current) => 
          new Date(prev.created_at) > new Date(current.created_at) ? prev : current
        ).created_at
      : new Date().toISOString();

    return {
      rates: rates.map(rate => ({
        id: rate.id,
        label: rate.symbol,
        value: rate.value.toString().replace('.', ','),
        currency: rate.currency,
      })),
      lastUpdate: latestUpdate,
    };
  }

  async updateBcvRates(updateBcvRatesDto: UpdateBcvRatesDto) {
    const { usd, eur } = updateBcvRatesDto;
    const client = this.supabaseService.getClient();

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

    const { error } = await client
      .from('exchange_rates')
      .insert(newEntries);

    if (error) {
      this.logger.error(`Error inserting BCV rates: ${error.message}`);
      throw new Error('Failed to save BCV rates');
    }

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

      const { error } = await this.supabaseService.getClient()
        .from('exchange_rates')
        .insert(newEntries);

      if (error) {
        this.logger.error(`Error inserting BCV rates during sync: ${error.message}`);
        throw error;
      }

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
      await this.supabaseService.getClient()
        .from('exchange_rates')
        .upsert({
          symbol: 'USDT',
          label: 'Binance USDT',
          value: price,
          provider: 'Binance',
          currency: 'VES'
        }, { onConflict: 'symbol' });
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

      const { error } = await this.supabaseService.getClient()
        .from('exchange_rates')
        .insert({
          symbol: asset,
          label: `Binance ${asset}`,
          value: price,
          provider: 'Binance',
          currency: fiat,
        });

      if (error) {
        this.logger.error(`Error inserting into exchange_rates: ${error.message}`);
        throw error;
      }

      this.logger.log(`Successfully synced Binance price: ${price}`);
      return { price };
    } catch (error) {
      this.logger.error(`Failed to sync Binance price: ${error.message}`);
      throw error;
    }
  }

  async getHistory(days: number = 7) {
    const symbols = ['USD', 'EUR', 'USDT'];
    const client = this.supabaseService.getClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const historyData = await Promise.all(
      symbols.map(async (symbol) => {
        const { data, error } = await client
          .from('exchange_rates')
          .select('value, created_at')
          .eq('symbol', symbol)
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: true });

        if (error) {
          this.logger.error(`Error fetching history for ${symbol}: ${error.message}`);
          return { symbol, history: [] };
        }

        const history = data.map((item) => ({
          value: item.value,
          date: item.created_at,
        }));

        const currentPrice = history.length > 0 ? history[history.length - 1].value : 0;
        const initialPrice = history.length > 0 ? history[0].value : 0;
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
