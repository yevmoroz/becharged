import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, BackHandler } from 'react-native';

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
import { ChargingStationDataItem, useStartCharging } from '../hooks';

type Props = {
  item: ChargingStationDataItem;
  isActive: boolean;
  onStart: (id: number) => void;
  onBack: () => void;
};

export const ChargingStationDetails = (props: Props) => {
  const styles = useTheme(themeableStyles);
  const [chargingError, startCharging] = useStartCharging(props.item.id, props.onStart);
  useEffect(() => {
    const onBack = () => {
      props.onBack();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBack);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onBack}>
        <View style={styles.row}>
          <Ionicons
            aria-label="Arrow pointing to the left"
            style={styles.icon}
            name="arrow-back"
            size={32}
            color={styles.icon.color}
          />
          <Text style={styles.back}>go back to all</Text>
        </View>
      </Pressable>
      <View style={styles.row}>
        <Ionicons
          aria-label="POI"
          style={styles.icon}
          name="location-sharp"
          size={32}
          color={styles.icon.color}
        />
        <View>
          <Text style={styles.title}>{props.item.addressInfo.title}</Text>
          <Text
            style={styles.small}>{`${props.item.addressInfo.distance.toFixed(2)} km away`}</Text>
        </View>
      </View>
      {props.isActive && (
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Charging...</Text>
          </View>
        </View>
      )}
      {!props.isActive && !chargingError && (
        <Pressable onPress={startCharging}>
          <View style={styles.row}>
            <Ionicons
              aria-label="Charge icon"
              style={styles.icon}
              name="flash"
              size={32}
              color={styles.icon.color}
            />
            <View>
              <Text style={styles.title}>Start Charging</Text>
            </View>
          </View>
        </Pressable>
      )}
      {chargingError && (
        <View style={styles.row}>
          <Ionicons
            aria-label="Warning sign"
            style={styles.icon}
            name="warning"
            size={32}
            color={styles.icon.color}
          />
          <View>
            <Text style={styles.title}>Charging is currently unavailable</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: PAD_XXL,
      marginVertical: PAD_S,
      backgroundColor: theme.colors.PRIMARY,
      borderRadius: BORDER_RADIUS_S,
    },
    row: {
      paddingHorizontal: PAD_S,
      paddingVertical: PAD_L,
      flexDirection: 'row',
    },
    back: {
      alignSelf: 'center',
      color: theme.colors.SECONDARY,
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
    start: {
      alignSelf: 'center',
      color: theme.colors.SECONDARY,
    },
  });
