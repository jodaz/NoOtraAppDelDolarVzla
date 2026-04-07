import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Platform, useWindowDimensions } from 'react-native';
import { Text } from '@/components/Themed';
import { TopHeader } from '@/components/TopHeader';
import { GradientBackground } from '@/components/GradientBackground';
import { CreditsFooter } from '@/components/CreditsFooter';
import { Shield, Globe, Mail } from 'lucide-react-native';

export default function PrivacyPolicyScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width > 768;
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const content = {
    es: {
      title: 'Políticas de Privacidad',
      intro: 'AKomo es una aplicación web y móvil diseñada para convertir Bolívares (Bs) a Dólares (USD). En AKomo, nos tomamos muy en serio la privacidad y la seguridad de nuestros usuarios.',
      noData: 'Queremos asegurarte que no recopilamos, almacenamos ni compartimos ningún tipo de información personal de nuestros usuarios.',
      functionality: 'La única función de la aplicación es conectarse a un servicio externo para obtener el valor actual de la moneda y realizar la conversión solicitada.',
      anonymity: 'Tu uso de AKomo es completamente anónimo y seguro. Nos comprometemos a mantener esta política de privacidad para proteger tu información y garantizar una experiencia confiable y transparente.',
      contact: 'Si tienes alguna pregunta sobre nuestra política de privacidad, no dudes en contactarnos.',
    },
    en: {
      title: 'Privacy Policy',
      intro: 'AKomo is a web and mobile application designed to convert Bolívares (Bs) to Dollars (USD). At AKomo, we take our users\' privacy and security very seriously.',
      noData: 'We want to assure you that we do not collect, store, or share any type of personal information from our users.',
      functionality: 'The sole function of the application is to connect to an external service to obtain the current currency value and perform the requested conversion.',
      anonymity: 'Your use of AKomo is completely anonymous and secure. We are committed to maintaining this privacy policy to protect your information and ensure a reliable and transparent experience.',
      contact: 'If you have any questions about our privacy policy, feel free to contact us.',
    }
  };

  const t = content[lang];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GradientBackground>
        <TopHeader />

        <ScrollView contentContainerStyle={[styles.scrollContent, isDesktop && styles.desktopScrollContent]}>
          <View style={isDesktop ? styles.desktopCardContainer : styles.mobileCardContainer}>
            
            {/* Language Toggle */}
            <View style={styles.langToggleContainer}>
              <TouchableOpacity 
                onPress={() => setLang('es')} 
                style={[styles.langBtn, lang === 'es' && styles.langBtnActive]}
              >
                <Globe size={14} color={lang === 'es' ? '#000' : '#F1C40F'} />
                <Text style={[styles.langBtnText, lang === 'es' && styles.langBtnTextActive]}>ES</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setLang('en')} 
                style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
              >
                <Globe size={14} color={lang === 'en' ? '#000' : '#F1C40F'} />
                <Text style={[styles.langBtnText, lang === 'en' && styles.langBtnTextActive]}>EN</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.header}>
                <Shield size={48} color="#F1C40F" style={styles.shieldIcon} />
                <Text style={styles.title}>{t.title}</Text>
              </View>

              <Text style={styles.text}>{t.intro}</Text>
              <Text style={styles.textHighlight}>{t.noData}</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.text}>{t.functionality}</Text>
              <Text style={styles.text}>{t.anonymity}</Text>

              <View style={styles.divider} />

              <View style={styles.contactSection}>
                <Text style={styles.contactText}>{t.contact}</Text>
                <View style={styles.emailContainer}>
                  <Mail size={18} color="#F1C40F" />
                  <Text style={styles.emailText}>jesus@jodaz.xyz</Text>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <CreditsFooter />
            </View>
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
    paddingTop: 20,
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
  langToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    gap: 8,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 196, 15, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(241, 196, 15, 0.3)',
    gap: 4,
  },
  langBtnActive: {
    backgroundColor: '#F1C40F',
    borderColor: '#F1C40F',
  },
  langBtnText: {
    color: '#F1C40F',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Zain_700Bold',
  },
  langBtnTextActive: {
    color: '#000',
  },
  card: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: 'rgba(27, 107, 62, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(27, 107, 62, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  shieldIcon: {
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Zain_700Bold',
  },
  text: {
    color: '#F0F0F0',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
    fontFamily: 'Zain_400Regular',
  },
  textHighlight: {
    color: '#F1C40F',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'justify',
    fontFamily: 'Zain_700Bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 24,
  },
  contactSection: {
    alignItems: 'center',
    marginTop: 8,
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Zain_400Regular',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 8,
  },
  emailText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Zain_700Bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
});
