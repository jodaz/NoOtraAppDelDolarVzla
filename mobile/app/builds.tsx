import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity, StatusBar, Platform, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import { CreditsFooter } from '@/components/CreditsFooter';
import { TopHeader } from '@/components/TopHeader';
import { GradientBackground } from '@/components/GradientBackground';
import { useRouter } from 'expo-router';
import { useBuilds, Build } from '@/hooks/use-builds';
import { Download, ChevronLeft } from 'lucide-react-native';

export default function BuildsScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isDesktop = Platform.OS === 'web' && width > 768;
  const { data: builds, isLoading, error } = useBuilds();

  const handleDownload = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GradientBackground>
        <TopHeader />

        <ScrollView contentContainerStyle={[styles.scrollContent, isDesktop && styles.desktopScrollContent]}>
          <View style={isDesktop ? styles.desktopCardContainer : styles.mobileCardContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ChevronLeft size={24} color="#fff" />
              <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>

            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Descargas Disponibles</Text>
              </View>

              {isLoading ? (
                <ActivityIndicator size="large" color="#14b8a6" style={{ marginVertical: 40 }} />
              ) : error ? (
                <Text style={styles.errorText}>Error al cargar las descargas.</Text>
              ) : builds && builds.length > 0 ? (
                builds.map((build: Build, index: number) => (
                  <View key={index}>
                    <TouchableOpacity 
                      style={styles.buildItem}
                      onPress={() => handleDownload(build.url)}
                    >
                      <View style={styles.buildInfo}>
                        <Text style={styles.versionLabel}>Versión {build.version}</Text>
                        <Text style={styles.platformLabel}>{build.platform.toUpperCase()}</Text>
                      </View>
                      <Download size={24} color="#F1C40F" />
                    </TouchableOpacity>
                    {index < builds.length - 1 && <View style={styles.divider} />}
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No hay versiones disponibles para descargar.</Text>
              )}

              <View style={styles.divider} />

              <Text style={styles.disclaimerText}>
                Descargo de responsabilidad: Asegúrate de descargar la versión correcta para tu dispositivo. No nos hacemos responsables por instalaciones de fuentes no confiables.
              </Text>
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
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    flexGrow: 1,
  },
  desktopScrollContent: {
    justifyContent: 'center',
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
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#1B6B3E',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  buildItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  buildInfo: {
    flex: 1,
  },
  versionLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  platformLabel: {
    color: '#F1C40F',
    fontSize: 14,
    marginTop: 4,
  },
  disclaimerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  errorText: {
    color: '#E74C3C',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyText: {
    color: '#F0F0F0',
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
});
