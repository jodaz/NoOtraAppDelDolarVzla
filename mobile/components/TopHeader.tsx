import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, useWindowDimensions } from 'react-native';
import { Text } from '@/components/Themed';
import { useRouter, usePathname } from 'expo-router';
import { Home, HelpCircle, BarChart3 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isDesktop = Platform.OS === 'web' && width > 768;

  const navigateTo = (screen: string) => {
    // @ts-ignore
    router.push(screen === 'index' ? '/' : `/${screen}`);
  };

  const activeColor = '#F1C40F';
  const inactiveColor = '#09c058ff';

  const isHomeActive = pathname === '/' || pathname === '/index';
  const isHistoryActive = pathname === '/history' || pathname.includes('history');
  const isInfoActive = pathname === '/info';

  return (
    <View style={[styles.container, { paddingTop: insets.top + (Platform.OS === 'ios' ? 0 : 10) }]}>
      <View style={[styles.contentContainer, isDesktop && styles.desktopContent]}>
        {/* Logo Section */}
        <View style={styles.logoRow}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.appName}>AKomo</Text>
        </View>

        {/* Navigation Icons */}
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigateTo('index')} style={styles.iconBtn}>
            <Home size={22} color={isHomeActive ? activeColor : inactiveColor} />
          </TouchableOpacity>

          {/* History button */}
          <TouchableOpacity onPress={() => navigateTo('(tabs)/history')} style={styles.iconBtn}>
            <BarChart3 size={22} color={isHistoryActive ? activeColor : inactiveColor} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateTo('info')} style={styles.iconBtn}>
            <HelpCircle size={24} color={isInfoActive ? activeColor : inactiveColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 100,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  desktopContent: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Zain_700Bold',
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
});
