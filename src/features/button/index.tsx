import { StyleSheet, View, Text, Pressable } from 'react-native';

import { useTheme, Theme } from '../theme/hooks';

type Props = {
  onPress: () => void;
  children: string;
};

export const Button: React.FC<Props> = (props) => {
  const themedStyles = useTheme(styles);
  return (
    <Pressable onPress={props.onPress}>
      <View style={themedStyles.container}>
        <Text style={themedStyles.text}>{props.children}</Text>
      </View>
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      margin: 10,
      padding: 10,
      minWidth: 200,
      borderRadius: 5,
      backgroundColor: theme.colors.SECONDARY,
      alignItems: 'center',
    },
    text: {
      color: theme.colors.PRIMARY,
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
