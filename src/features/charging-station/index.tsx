import { View, FlatList, StyleSheet, Text } from 'react-native';

import { useChargingStationsByLocation } from '../charging-station/hooks';
import { useDeviceLocation } from '../location/hooks';

export const ChargingStations = () => {
  const [location] = useDeviceLocation();
  const [chargingStations] = useChargingStationsByLocation(location);

  return (
    <View style={styles.container}>
      <FlatList
        data={chargingStations}
        renderItem={({ item }) => <Text style={styles.item}>{item.addressInfo.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
