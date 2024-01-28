import { View, StyleSheet, Text } from 'react-native';

import { FONT_SIZE_TITLE, FONT_WEIGHT_BOLD, PAD_L, PAD_S, PAD_XXL } from '../../theme/common';
import { Theme, useTheme } from '../../theme/hooks';

export const Message = (props) => {
  const styles = useTheme(themeableStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.PRIMARY,
      marginHorizontal: PAD_XXL,
      marginVertical: PAD_S,
      paddingHorizontal: PAD_S,
      paddingVertical: PAD_L,
    },
    title: {
      textAlign: 'center',
      fontSize: FONT_SIZE_TITLE,
      fontWeight: FONT_WEIGHT_BOLD,
      color: theme.colors.SECONDARY,
    },
  });
