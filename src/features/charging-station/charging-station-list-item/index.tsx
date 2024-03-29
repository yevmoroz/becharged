import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Text, Pressable } from 'react-native';

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
  onChargingStationSelected: (id: number) => void;
};

export const ChargingStationListItem = (props: Props) => {
  const styles = useTheme(themeableStyles);
  return (
    <Pressable onPress={() => props.onChargingStationSelected(props.item.id)}>
      <View style={styles.listItem}>
        <Ionicons
          style={styles.poiIcon}
          aria-label="POI"
          name="location-sharp"
          size={32}
          color={styles.poiIcon.color}
        />
        <View>
          <Text style={styles.title}>{props.item.addressInfo.title}</Text>
          <Text
            style={styles.small}>{`${props.item.addressInfo.distance.toFixed(2)} km away`}</Text>
        </View>
        <View style={styles.chevron}>
          <Ionicons
            style={styles.chevronIcon}
            aria-label="chevron pointing to the right"
            name="chevron-forward-outline"
            size={32}
            color={styles.chevronIcon.color}
          />
        </View>
      </View>
    </Pressable>
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
      alignItems: 'center',
    },
    poiIcon: {
      marginRight: PAD_M,
      color: theme.colors.SECONDARY,
    },
    chevron: {
      flex: 1,
    },
    chevronIcon: {
      color: theme.colors.SECONDARY,
      alignSelf: 'flex-end',
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
