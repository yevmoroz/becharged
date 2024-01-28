import { View, StyleSheet } from 'react-native';

import { ChargingStationList } from './charging-station-list';
import { Message } from './message';
import { useChargingStationsByLocation } from '../charging-station/hooks';
import { useDeviceLocation } from '../location/hooks';
import { PAD_4XL } from '../theme/common';

export const ChargingStation = () => {
  const [location, locationError] = useDeviceLocation();
  const [chargingStations, chargingStationsError] = useChargingStationsByLocation(location);
  const notReadyYet =
    chargingStations === null && locationError === null && chargingStationsError === null;

  let content;
  if (notReadyYet) {
    content = <Message>Waiting on charging stations to be ready</Message>;
  } else if (locationError) {
    content = <Message>Location access required</Message>;
  } else if (chargingStationsError) {
    content = <Message>Charging stations not available</Message>;
  } else if (!chargingStations?.length) {
    content = <Message>No charging stations found in the area</Message>;
  } else {
    content = <ChargingStationList items={chargingStations} />;
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: PAD_4XL,
  },
});
