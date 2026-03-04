import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, Image, Platform, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Themed';
import React from 'react';
import { useExchangeRates } from '@/hooks/use-exchange-rates';
import { RatesCard } from '@/components/RatesCard';
import { TopHeader } from '@/components/TopHeader';
import { CreditsFooter } from '@/components/CreditsFooter';
import { GradientBackground } from '@/components/GradientBackground';

export default function TasasScreen() {
  const { data, isLoading: loading } = useExchangeRates();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isDesktop = Platform.OS === 'web' && width > 768;

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#14b8a6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        <TopHeader />

        <ScrollView contentContainerStyle={[styles.scrollContent, isDesktop && styles.desktopScrollContent]}>
          {/* Rates Card Component */}
          <View style={isDesktop ? styles.desktopCardContainer : styles.mobileCardContainer}>
            <RatesCard data={data} />
            
            {Platform.OS === 'web' && (
              <TouchableOpacity 
                style={styles.downloadButton}
                onPress={() => router.push('/builds')}
              >
                <Image 
                  source={require('../assets/images/apk-icon.png')} 
                  style={styles.downloadIcon}
                />
                <Text style={styles.downloadButtonText}>Descargar APK</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.footerButtonContainer}>
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
    backgroundColor: 'transparent',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 40,
    flexGrow: 1,
  },
  desktopScrollContent: {
    justifyContent: 'center',
    paddingTop: 40,
  },
  desktopCardContainer: {
    width: '100%',
    maxWidth: 600,
  },
  mobileCardContainer: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
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
    color: '#F1C40F',
    fontSize: 18,
  },
  footerButtonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerButtonText: {
     display: 'none',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 107, 62, 0.4)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1B6B3E',
    marginTop: 20,
    alignSelf: 'center',
  },
  downloadIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  downloadButtonText: {
    color: '#F1C40F',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

