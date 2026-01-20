import React from 'react';
import { Tabs } from 'expo-router';
import { BarChart2, RefreshCw, History } from 'lucide-react-native';

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
          title: 'OtraAppDelDolarEnVzla',
          tabBarLabel: 'Tasas',
          tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="convert"
        options={{
          title: 'OtraAppDelDolarEnVzla',
          tabBarLabel: 'Convertir',
          tabBarIcon: ({ color }) => <RefreshCw size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'OtraAppDelDolarEnVzla',
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color }) => <History size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
          },
        }}
      />
    </Tabs>
  );
}
