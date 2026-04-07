import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, ViewStyle, View } from 'react-native';
import { Text } from '@/components/Themed';
import { useRouter } from 'expo-router';

interface CreditsFooterProps {
  style?: ViewStyle;
}

export function CreditsFooter({ style }: CreditsFooterProps) {
  const router = useRouter();

  const openWebsite = () => {
    Linking.openURL('https://jodaz.xyz');
  };

  const openPrivacy = () => {
    router.push('/privacy-policy');
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={openPrivacy} style={styles.privacyLink}>
        <Text style={styles.privacyText}>Privacidad</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>•</Text>

      <TouchableOpacity onPress={openWebsite} style={styles.linkContainer}>
        <Text style={styles.linkUrl}>jodaz.xyz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkUrl: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Zain_700Bold',
  },
  privacyLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    fontFamily: 'Zain_700Bold',
  },
  separator: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 14,
  },
});
