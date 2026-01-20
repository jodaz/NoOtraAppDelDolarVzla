import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { useExchangeHistory } from '@/hooks/use-exchange-history';
import { HistoryChart } from '@/components/HistoryChart';
import { TrendingUp, ArrowUpRight } from 'lucide-react-native';

export default function HistoryScreen() {
  const [days, setDays] = useState(7);
  const { data, isLoading, error } = useExchangeHistory(days);

  const renderTab = (value: number, label: string) => {
    const isActive = days === value;
    return (
      <TouchableOpacity
        style={[styles.tab, isActive && styles.tabActive]}
        onPress={() => setDays(value)}
      >
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRateCard = (symbol: string, current: number, change: number) => {
    let label = '';
    let color = '#fff';
    if (symbol === 'USD') {
        label = 'USD BCV';
        color = '#fff';
    } else if (symbol === 'EUR') {
        label = 'EUR BCV';
        color = '#F1C40F';
    } else {
        label = 'USDT (Binance)';
        color = '#14b8a6';
    }

    return (
      <View key={symbol} style={styles.rateCard}>
        <View style={styles.rateCardLeft}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.rateLabel}>{label}</Text>
        </View>
        <View style={styles.rateCardRight}>
          <Text style={styles.rateValue}>{current.toFixed(2)}</Text>
          <View style={styles.changeContainer}>
            <ArrowUpRight size={14} color={change > 0 ? "#F1C40F" : "#14b8a6"} />
            <Text style={[styles.rateChange, change < 0 && styles.rateChangeNegative]}>
              {change > 0 ? '+' : ''}{change}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#F1C40F" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tabContainer}>
          {renderTab(7, '7 días')}
          {renderTab(30, '30 días')}
        </View>

        <View style={styles.cardsContainer}>
          {data?.map((item) => renderRateCard(item.symbol, item.currentPrice, item.change))}
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Evolución últimos {days} días</Text>
          {data && <HistoryChart data={data} days={days} />}
          <Text style={styles.dataDaysLabel}>{days} días de datos</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#145931',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1B6B3E',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#448A44',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 21,
  },
  tabActive: {
    backgroundColor: '#F1C40F',
  },
  tabText: {
    color: '#fff',
    fontWeight: '600',
    opacity: 0.7,
  },
  tabTextActive: {
    color: '#145931',
    opacity: 1,
  },
  cardsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  rateCard: {
    backgroundColor: '#1B6B3E',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#448A44',
  },
  rateCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  rateLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  rateCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateChange: {
    color: '#F1C40F',
    fontSize: 14,
    fontWeight: '600',
  },
  rateChangeNegative: {
    color: '#14b8a6',
  },
  chartSection: {
    backgroundColor: '#1B6B3E',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#448A44',
  },
  chartTitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 10,
  },
  dataDaysLabel: {
    color: '#F1C40F',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    opacity: 0.8,
  },
});
