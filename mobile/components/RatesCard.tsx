import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import { DollarSign, Euro, RotateCcw } from 'lucide-react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ExchangeData } from '../stores/exchange-store';
import React, { useState, useRef } from 'react';
import * as Clipboard from 'expo-clipboard';

import { formatNumber } from '../utils/format';

interface RatesCardProps {
  data: ExchangeData | undefined;
}

export function RatesCard({ data }: RatesCardProps) {
  const [amount, setAmount] = useState('1');
  const [isBsToUnit, setIsBsToUnit] = useState(false); // false: Unit -> Bs, true: Bs -> Unit
  const [showToast, setShowToast] = useState(false);
  const toastY = useRef(new Animated.Value(10)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const formattedDate = data?.lastUpdate
    ? format(new Date(data.lastUpdate), "dd/MM/yy hh:mm:ss a", { locale: es })
    : '';

  const getCurrencyIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    switch (true) {
      case lowerLabel.includes('usdt'):
        return <Image source={require('../assets/images/logos/usdt.png')} style={{ width: 24, height: 24 }} />;
      case lowerLabel.includes('euro'):
      case lowerLabel.includes('eur'):
        return <Euro size={24} color="#14b8a6" />;
      default:
        return <DollarSign size={24} color="#14b8a6" />;
    }
  };

  const calculateResult = (rateValue: string) => {
    const numAmount = parseFloat(amount.replace(',', '.')) || 0;
    const numRate = parseFloat(rateValue.replace(',', '.')) || 0;
    
    if (isBsToUnit) {
      return numRate > 0 ? (numAmount / numRate).toFixed(2) : '0.00';
    } else {
      return (numAmount * numRate).toFixed(2);
    }
  };

  const showCopyToast = () => {
    setShowToast(true);
    Animated.parallel([
      Animated.timing(toastY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastY, {
            toValue: 20,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(toastOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => setShowToast(false));
      }, 2000);
    });
  };

  const handleLongPress = async (value: string) => {
    await Clipboard.setStringAsync(value);
    showCopyToast();
  };

  const handleReset = () => {
    setAmount('1');
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Convertir</Text>
        
        {/* Custom Toggle */}
        <TouchableOpacity 
          style={styles.customToggleContainer} 
          onPress={() => setIsBsToUnit(!isBsToUnit)}
          activeOpacity={0.8}
        >
          <View style={[styles.toggleSection, !isBsToUnit && styles.activeToggleSection]}>
             <Text style={[styles.toggleText, !isBsToUnit && styles.activeToggleText]}>Divisa</Text>
          </View>
          <View style={[styles.toggleSection, isBsToUnit && styles.activeToggleSection]}>
             <Text style={[styles.toggleText, isBsToUnit && styles.activeToggleText]}>Bs</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.globalInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder={isBsToUnit ? "Monto en Bolivares" : "1"}
          placeholderTextColor="rgba(255,255,255,0.4)"
          maxLength={10}
        />
      </View>

      <View style={styles.ratesList}>
        {data?.rates.map((rate) => {
          const result = calculateResult(rate.value);
          const formattedResult = formatNumber(result);
          
          return (
            <TouchableOpacity 
              key={rate.id} 
              onLongPress={() => handleLongPress(formattedResult)}
              delayLongPress={500}
              activeOpacity={0.7}
            >
              <View style={styles.rateItem}>
                <View style={styles.rateLabelContainer}>
                  <View style={styles.iconContainer}>
                    {getCurrencyIcon(rate.label)}
                  </View>
                </View>
                
                <View style={styles.rateValueContainer}>
                  <Text style={styles.rateValueText}>{formattedResult}</Text>
                  <Text style={styles.rateCurrency}>
                    {isBsToUnit ? rate.label : 'Bs.'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <RotateCcw size={20} color="#F1C40F" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.updateText}>
          Última actualización: {formattedDate}
        </Text>
      </View>

      {/* Custom Toast */}
      {showToast && (
        <Animated.View 
          style={[
            styles.toastContainer, 
            { 
              transform: [{ translateY: toastY }],
              opacity: toastOpacity 
            }
          ]}
        >
          <Text style={styles.toastText}>¡Monto copiado!</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#448A44',
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  customToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1B6B3E',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#448A44',
    padding: 4,
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 4,
    padding: 2,
  },
  activeToggleSection: {
    backgroundColor: '#F1C40F',
    borderRadius: 18,
  },
  toggleText: {
    color: '#F1C40F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#1B6B3E',
  },
  inputWrapper: {
    marginBottom: 12,
    backgroundColor: '#1B6B3E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#448A44',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  globalInput: {
    color: '#F1C40F',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
  ratesList: {
    gap: 12,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#1B6B3E',
    borderWidth: 1,
    borderColor: '#448A44',
  },
  rateLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20, 184, 166, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateLabel: {
    color: '#F1C40F',
    fontSize: 18,
    fontWeight: '500',
  },
  rateValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  rateValueText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rateCurrency: {
    color: '#F1C40F',
    fontSize: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  resetButton: {
    backgroundColor: '#1B6B3E',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#448A44',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  updateText: {
    color: '#F1C40F',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    backgroundColor: '#F1C40F',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1B6B3E',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  toastText: {
    color: '#1B6B3E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
