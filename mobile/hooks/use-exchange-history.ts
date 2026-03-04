import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface HistoryItem {
  value: number;
  date: string;
}

export interface ExchangeHistory {
  symbol: string;
  currentPrice: number;
  change: number;
  history: HistoryItem[];
}

async function fetchExchangeHistory(days: number): Promise<ExchangeHistory[]> {
  const response = await fetch(`${API_URL}/api/exchange-rates/history?days=${days}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useExchangeHistory(days: number) {
  return useQuery({
    queryKey: ['exchangeHistory', days],
    queryFn: () => fetchExchangeHistory(days),
    refetchInterval: 3600 * 1000, // 1 hour
  });
}
