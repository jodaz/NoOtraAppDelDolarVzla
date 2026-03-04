import { Text as DefaultText, View as DefaultView, StyleSheet, TextInput as DefaultTextInput } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

// Helper to resolve font family based on font weight
const getFontFamily = (baseStyle: any) => {
  const flattened = StyleSheet.flatten(baseStyle);
  const weight = flattened?.fontWeight;
  
  if (weight === '900') {
    return 'Zain_900Black';
  }
  if (weight === '800') {
    return 'Zain_800ExtraBold';
  }
  if (weight === 'bold' || weight === '700') {
    return 'Zain_700Bold';
  }
  if (weight === '600') {
    return 'Zain_700Bold';
  }
  if (weight === '500') {
    return 'Zain_400Regular';
  }
  return 'Zain_400Regular';
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const fontFamily = getFontFamily(style);

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  const fontFamily = getFontFamily(style);

  return <DefaultTextInput style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
