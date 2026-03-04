import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Text } from '@/components/Themed';
import { useExchangeHistory } from '@/hooks/use-exchange-history';
import { HistoryChart } from '@/components/HistoryChart';
import { GradientBackground } from '@/components/GradientBackground';
import { TopHeader } from '@/components/TopHeader';
import { CreditsFooter } from '@/components/CreditsFooter';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

export default function HistoryScreen() {
  const [days, setDays] = useState(7);
  const { data, isLoading } = useExchangeHistory(days);
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width > 768;

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
    const label =
      symbol === 'USD' ? 'USD BCV' : symbol === 'EUR' ? 'EUR BCV' : 'USDT (Binance)';
    const color =
      symbol === 'USD' ? '#FFFFFF' : symbol === 'EUR' ? '#F1C40F' : '#14b8a6';
    const isPositive = change >= 0;
    const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

    return (
      <View key={symbol} style={styles.rateCard}>
        <View style={styles.rateCardLeft}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.rateLabel}>{label}</Text>
        </View>
        <View style={styles.rateCardRight}>
          {/* Rate value: size 24, bold per design token */}
          <Text style={styles.rateValue}>{current.toFixed(2)}</Text>
          <View style={styles.changeContainer}>
            <ChangeIcon size={14} color={isPositive ? '#F1C40F' : '#14b8a6'} />
            <Text style={[styles.rateChange, !isPositive && styles.rateChangeNegative]}>
              {isPositive ? '+' : ''}{change}%
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
      <GradientBackground>
        <TopHeader />
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isDesktop && styles.desktopScrollContent,
          ]}
        >
          <View style={isDesktop ? styles.desktopContent : undefined}>
            {/* Day range toggle — pill style per guidelines */}
            <View style={styles.tabContainer}>
              {renderTab(7, '7 días')}
              {renderTab(30, '30 días')}
            </View>

            {/* Rate summary cards */}
            <View style={styles.cardsContainer}>
              {data?.map((item) => renderRateCard(item.symbol, item.currentPrice, item.change))}
            </View>

            {/* Chart section — card rules: borderRadius 20, padding 24, border */}
            <View style={styles.chartSection}>
              <Text style={styles.chartTitle}>Evolución últimos {days} días</Text>
              {data && <HistoryChart data={data} days={days} />}
              <Text style={styles.dataDaysLabel}>{days} días de datos</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <CreditsFooter />
          </View>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',   // GradientBackground handles the bg
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,            // screen horizontal padding: 16
    paddingTop: 20,
    paddingBottom: 40,
  },
  desktopScrollContent: {
    alignItems: 'center',
    paddingTop: 40,
  },
  desktopContent: {
    width: '100%',
    maxWidth: 600,
  },
  // Pill toggle — per design token: backgroundColor #1B6B3E, borderRadius 20, border, padding 4
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1B6B3E',
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#448A44',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 18,               // inner radius for pill: borderRadius - padding
  },
  tabActive: {
    backgroundColor: '#F1C40F',    // active section: yellow
  },
  tabText: {
    color: '#F1C40F',              // inactive text: yellow per toggle rule
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#1B6B3E',              // active text: dark green per toggle rule
  },
  cardsContainer: {
    gap: 12,                       // section gap (list): 12
    marginBottom: 20,
  },
  rateCard: {
    backgroundColor: '#1B6B3E',   // surface/card background
    borderRadius: 20,              // card border radius: 20
    padding: 16,                   // list item padding: 16
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#448A44',        // border: green-border
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
    color: '#FFFFFF',              // text-primary
    fontSize: 16,
    fontWeight: '500',
  },
  rateCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rateValue: {
    color: '#FFFFFF',
    fontSize: 24,                  // rate value: 24 bold per design token
    fontWeight: 'bold',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rateChange: {
    color: '#F1C40F',             // yellow-accent for positive change
    fontSize: 14,
    fontWeight: '600',
  },
  rateChangeNegative: {
    color: '#14b8a6',             // teal-accent for negative change
  },
  // Chart card: borderRadius 20, padding 24, border per guidelines
  chartSection: {
    backgroundColor: '#1B6B3E',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#448A44',
  },
  chartTitle: {
    color: '#FFFFFF',
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
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
});
