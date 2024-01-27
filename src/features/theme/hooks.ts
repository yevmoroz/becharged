import { useColorScheme } from 'react-native';

type Colors = {
  PRIMARY: string;
  SECONDARY: string;
};

export type Theme = {
  colors: Colors;
};

export const useTheme = <T>(themeableStyles: (theme: Theme) => T) => {
  const colorScheme = useColorScheme();

  let colors: Colors;
  if (colorScheme === 'light') {
    colors = require('./light/colors');
  } else if (colorScheme === 'dark') {
    colors = require('./dark/colors');
  } else {
    throw new Error('Unsupported theme');
  }

  const theme: Theme = {
    colors,
  };
  return themeableStyles(theme);
};
