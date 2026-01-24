import { Platform } from 'react-native';

export const storage =
  Platform.OS === 'web'
    ? localStorage
    : require('@react-native-async-storage/async-storage').default;