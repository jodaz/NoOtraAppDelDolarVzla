import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Linking, TouchableOpacity, StatusBar } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

export default function InfoScreen() {
  const openWebsite = () => {
    Linking.openURL('https://jodaz.xyz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Particles for consistency with Home */}
      <View style={[styles.particle, { top: 80, left: 40, width: 8, height: 8, backgroundColor: '#14b8a6', opacity: 0.2 }]} />
      <View style={[styles.particle, { top: 160, right: 80, width: 12, height: 12, backgroundColor: '#a855f7', opacity: 0.15 }]} />
      <View style={[styles.particle, { bottom: 240, left: '25%', width: 8, height: 8, backgroundColor: '#2dd4bf', opacity: 0.1 }]} />
      <View style={[styles.particle, { top: '50%', right: 40, width: 8, height: 8, backgroundColor: '#c084fc', opacity: 0.15 }]} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Sobre la app</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Esta aplicación proporciona información oficial y pública sobre la tasa de cambio en Venezuela, basada en datos del Banco Central de Venezuela (BCV) y otros indicadores de interés nacional.
          </Text>
          
          <Text style={styles.text}>
            La información se presenta de forma clara y accesible para facilitar cálculos y conversiones, sin alterar el contenido original de las fuentes.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Datos de Binance P2P</Text>
          <Text style={styles.text}>
            El precio del USDT se obtiene mediante un proceso automatizado que consulta los anuncios más recientes en el mercado P2P de Binance. Nuestro algoritmo calcula un promedio ponderado de dichos anuncios para ofrecer una tasa aproximada del mercado de cripto activos estables.
          </Text>
          <Text style={[styles.text]}>
            Bajo ningún concepto dicha tasa debe usarse como tasa de referencia en el mercado cambiario venezolano.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.disclaimerText}>
            Descargo de responsabilidad: Los desarrolladores no somos autores de la información mostrada ni responsables por su exactitud. Esta app no constituye asesoría financiera; el uso de los datos es responsabilidad del usuario.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLabel}>Desarrollado por</Text>
          <TouchableOpacity onPress={openWebsite} style={styles.linkContainer}>
            <Text style={styles.linkText}>Jesus</Text>
            <Text style={styles.linkSeparator}> • </Text>
            <Text style={styles.linkUrl}>jodaz.xyz</Text>
            <ExternalLink size={16} color="#F1C40F" style={styles.linkIcon} />
          </TouchableOpacity>
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
  particle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#F1C40F',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    color: '#F0F0F0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
  },
  disclaimerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  warningText: {
    color: '#E74C3C',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 4,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 196, 15, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(241, 196, 15, 0.3)',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkSeparator: {
    color: '#F1C40F',
    marginHorizontal: 4,
  },
  linkUrl: {
    color: '#F1C40F',
    fontSize: 16,
    fontWeight: '600',
  },
  linkIcon: {
    marginLeft: 8,
  },
});
