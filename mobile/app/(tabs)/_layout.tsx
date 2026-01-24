import React from 'react';
import { Tabs } from 'expo-router';
import { BarChart2, Info, RefreshCw } from 'lucide-react-native';

import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: '#145931',
        tabBarActiveTintColor: '#F1C40F',
        tabBarStyle: {
          backgroundColor: '#448A44',
          borderTopColor: '#333',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'AKomo',
          tabBarLabel: 'Tasas',
          tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
            fontFamily: 'Zain_700Bold',
          },
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Información',
          tabBarLabel: 'Info',
          tabBarIcon: ({ color }) => <Info size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
            fontFamily: 'Zain_700Bold',
          },
        }}
      />
    </Tabs>
  );
}
