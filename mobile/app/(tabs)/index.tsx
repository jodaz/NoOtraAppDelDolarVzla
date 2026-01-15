import { View, Text, ScrollView, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useExchangeRates } from '@/hooks/use-exchange-rates';

export default function TasasScreen() {
  const { data, isLoading: loading } = useExchangeRates();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#14b8a6" />
      </SafeAreaView>
    );
  }

  const formattedDate = data?.lastUpdate
    ? format(new Date(data.lastUpdate), "dd/MM/yy hh:mm:ss a", { locale: es })
    : '';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Dynamic background particles (simulated) */}
      <View style={[styles.particle, { top: 80, left: 40, width: 8, height: 8, backgroundColor: '#14b8a6', opacity: 0.4 }]} />
      <View style={[styles.particle, { top: 160, right: 80, width: 12, height: 12, backgroundColor: '#a855f7', opacity: 0.3 }]} />
      <View style={[styles.particle, { bottom: 240, left: '25%', width: 8, height: 8, backgroundColor: '#2dd4bf', opacity: 0.2 }]} />
      <View style={[styles.particle, { top: '50%', right: 40, width: 8, height: 8, backgroundColor: '#c084fc', opacity: 0.25 }]} />
      <View style={[styles.particle, { top: '75%', left: 40, width: 4, height: 4, backgroundColor: '#5eead4', opacity: 0.5 }]} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Image source={require('../../assets/images/logo.png')} style={styles.headerIcon} />
            <Text style={styles.headerTitle}>Otra App del Dolar en Vzla</Text>
          </View>
          <Text style={styles.headerSubtitle}>Tasas de cambio en Venezuela</Text>
        </View>

        {/* Rates Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tasas del día</Text>

          <View style={styles.ratesList}>
            {data?.rates.map((rate) => (
              <View key={rate.id} style={styles.rateItem}>
                <Text style={styles.rateLabel}>{rate.label}</Text>
                <View style={styles.rateValueContainer}>
                  <Text style={styles.rateValueText}>{rate.value}</Text>
                  <Text style={styles.rateCurrency}>{rate.currency}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.updateText}>
              Última actualización: {formattedDate}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitleRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 18,
  },
  card: {
    width: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  ratesList: {
    gap: 16,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#262628',
    borderWidth: 1,
    borderColor: '#333335',
  },
  rateLabel: {
    color: '#9ca3af',
    fontSize: 18,
    fontWeight: '500',
  },
  rateValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rateValueText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 4,
  },
  rateCurrency: {
    color: '#9ca3af',
    fontSize: 18,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  updateText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
