import { View, FlatList, StyleSheet, Text } from 'react-native';

import { useChargingStationsByLocation } from '../charging-station/hooks';
import { useDeviceLocation } from '../location/hooks';
import { Theme, useTheme } from '../theme/hooks';

export const ChargingStations = () => {
  const styles = useTheme(themeableStyles);
  const [location, locationError] = useDeviceLocation();
  const [chargingStations, chargingStationsError] = useChargingStationsByLocation(location, 5);
  const notReadyYet =
    chargingStations === null && locationError === null && chargingStationsError === null;

  let content;
  if (notReadyYet) {
    content = <Text style={styles.text}>Waiting on charging stations to be ready</Text>;
  } else if (locationError) {
    content = <Text style={styles.text}>Location access required</Text>;
  } else if (chargingStationsError) {
    content = <Text style={styles.text}>Charging stations not available</Text>;
  } else if (!chargingStations?.length) {
    content = <Text style={styles.text}>No charging stations found in the area</Text>;
  } else {
    content = (
      <FlatList
        data={chargingStations}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>{item.addressInfo.title}</Text>
            <Text style={styles.small}>{`${item.addressInfo.distance.toFixed(2)} km away`}</Text>
          </View>
        )}
      />
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 70,
      paddingLeft: 30,
    },
    listItem: {
      marginVertical: 15,
      height: 44,
    },
    text: {
      fontSize: 18,
      color: theme.colors.PRIMARY,
    },
    small: {
      fontSize: 18,
      color: theme.colors.PRIMARY,
    },
  });
