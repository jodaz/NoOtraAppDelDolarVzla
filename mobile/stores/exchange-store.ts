import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../utils/storage';

export interface ExchangeRate {
  id: string;
  label: string;
  value: string;
  currency: string;
}

export interface ExchangeData {
  rates: ExchangeRate[];
  lastUpdate: string;
}

interface ExchangeState {
  data: ExchangeData | null;
  setExchangeData: (data: ExchangeData) => void;
}

export const useExchangeStore = create<ExchangeState>()(
  persist(
    (set) => ({
      data: null,
      setExchangeData: (data) => set({ data }),
    }),
    {
      name: 'exchange-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
