import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { useTheme, Theme } from '../theme/hooks';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const AppContainer: React.FC<Props> = (props) => {
  const styles = useTheme(themeableStyles);
  return (
    <View style={styles.container}>
      {props.children}
      <StatusBar backgroundColor={styles.container.backgroundColor} />
    </View>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.SECONDARY,
    },
  });
