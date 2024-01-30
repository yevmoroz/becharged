import { Fragment, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ChargingStationList } from './charging-station-list';
import { ChargingStationMap } from './charging-station-map';
import { Message } from './message';
import { useChargingStationsByLocation } from '../charging-station/hooks';
import { useDeviceLocation } from '../location/hooks';
import { PAD_4XL, PAD_M } from '../theme/common';

export const ChargingStation = () => {
  const [location, locationError, locationNotReady, fetchLocation] = useDeviceLocation();
  const [selectedChargingStationId, setSelectedChargingStationId] = useState<number | null>(null);
  const [chargingStations, chargingStationsError, chargingStationsNotReady] =
    useChargingStationsByLocation(location);
  const selectedChargingStation = useMemo(
    () => chargingStations?.find((item) => item.id === selectedChargingStationId) ?? null,
    [selectedChargingStationId]
  );
  const notReadyYet = locationNotReady || chargingStationsNotReady;

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
    content = (
      <Fragment>
        <View style={styles.map}>
          <ChargingStationMap
            items={chargingStations}
            location={location}
            selectedChargingStation={selectedChargingStation}
            onMarkerSelected={setSelectedChargingStationId}
          />
        </View>

        <View style={styles.list}>
          <ChargingStationList
            items={chargingStations}
            onRefresh={fetchLocation}
            refreshing={notReadyYet}
            selectedChargingStation={selectedChargingStation}
            onChargingStationSelected={setSelectedChargingStationId}
          />
        </View>
      </Fragment>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: PAD_4XL,
  },
  list: {
    marginTop: PAD_M,
  },
  map: {
    minHeight: '30%',
  },
});
