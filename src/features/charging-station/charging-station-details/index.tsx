import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Text } from 'react-native';

import {
  BORDER_RADIUS_S,
  FONT_SIZE_TITLE,
  FONT_WEIGHT_BOLD,
  PAD_L,
  PAD_M,
  PAD_S,
  PAD_XXL,
} from '../../theme/common';
import { Theme, useTheme } from '../../theme/hooks';
import { ChargingStationDataItem } from '../hooks';

type Props = {
  item: ChargingStationDataItem;
};

export const ChargingStationDetails = (props: Props) => {
  const styles = useTheme(themeableStyles);

  return (
    <View style={styles.listItem}>
      <Ionicons style={styles.icon} name="location-sharp" size={32} color={styles.icon.color} />
      <View>
        <Text style={styles.title}>{props.item.addressInfo.title}</Text>
        <Text style={styles.small}>{`${props.item.addressInfo.distance.toFixed(2)} km away`}</Text>
      </View>
    </View>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    listItem: {
      marginHorizontal: PAD_XXL,
      marginVertical: PAD_S,
      paddingHorizontal: PAD_S,
      paddingVertical: PAD_L,
      backgroundColor: theme.colors.PRIMARY,
      borderRadius: BORDER_RADIUS_S,
      flexDirection: 'row',
    },
    icon: {
      marginRight: PAD_M,
      alignSelf: 'center',
      color: theme.colors.SECONDARY,
    },
    title: {
      fontSize: FONT_SIZE_TITLE,
      fontWeight: FONT_WEIGHT_BOLD,
      color: theme.colors.SECONDARY,
    },
    small: {
      color: theme.colors.SECONDARY,
    },
  });
