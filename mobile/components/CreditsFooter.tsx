import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import { ExternalLink } from 'lucide-react-native';

interface CreditsFooterProps {
  style?: ViewStyle;
}

export function CreditsFooter({ style }: CreditsFooterProps) {
  const openWebsite = () => {
    Linking.openURL('https://jodaz.xyz');
  };

  return (
    <TouchableOpacity onPress={openWebsite} style={[styles.linkContainer, style]}>
      <Text style={styles.linkUrl}>jodaz.xyz</Text>
      <ExternalLink size={16} color="#F1C40F" style={styles.linkIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 196, 15, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(241, 196, 15, 0.3)',
    alignSelf: 'center',
  },
  linkUrl: {
    color: '#F1C40F',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Zain_700Bold',
  },
  linkIcon: {
    marginLeft: 8,
  },
});
