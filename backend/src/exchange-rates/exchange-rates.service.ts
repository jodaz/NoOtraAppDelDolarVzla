import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { UpdateBcvRatesDto } from './dto/update-bcv-rates.dto';
import { BinanceP2PProvider } from './providers/binance-p2p.provider';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ExchangeRatesService {
  private readonly logger = new Logger(ExchangeRatesService.name);

  constructor(
    private readonly binanceProvider: BinanceP2PProvider,
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

  async getBinanceAverage(asset: string, fiat: string, tradeType: string) {
    const price = await this.binanceProvider.getAveragePrice(asset, fiat, tradeType);
    
    // Save USDT in history if it's USDT
    if (asset === 'USDT' && fiat === 'VES') {
      await this.supabaseService.getClient()
        .from('exchange_rates')
        .insert({
          symbol: 'USDT',
          label: 'Binance USDT',
          value: price,
          provider: 'Binance',
          currency: 'VES'
        });
    }

    return { average: price.toString() };
  }
}
