import React, { useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { OptionalLocationDetails } from '../../location/hooks';
import { ChargingStationDataItem, OptionalChargingStationDataItem } from '../hooks';

type Props = {
  items: ChargingStationDataItem[];
  location: OptionalLocationDetails;
  selectedChargingStation: OptionalChargingStationDataItem;
  onMarkerSelected: (id: number | null) => void;
};

const allStationsZoom = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const oneStationZoom = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const ChargingStationMap = (props: Props) => {
  const colorScheme = useColorScheme();
  const deviceRegion = useMemo(
    () =>
      (props.location
        ? {
            ...props.location,
            ...allStationsZoom,
          }
        : null) as Region,
    [props.location]
  );
  const selectedRegion = useMemo(
    () =>
      (props.selectedChargingStation
        ? {
            latitude: props.selectedChargingStation?.addressInfo.latitude,
            longitude: props.selectedChargingStation?.addressInfo.longitude,
            ...oneStationZoom,
          }
        : deviceRegion) as Region,
    [props.selectedChargingStation, deviceRegion]
  );

  let mapStyle;

  if (colorScheme === 'light') {
    mapStyle = require('./gmaps-light.json');
  } else if (colorScheme === 'dark') {
    mapStyle = require('./gmaps-dark.json');
  } else {
    throw new Error('Unsupported theme');
  }

  const markers = useMemo(() => {
    if (props.selectedChargingStation) {
      return (
        <Marker
          coordinate={{
            latitude: props.selectedChargingStation.addressInfo.latitude,
            longitude: props.selectedChargingStation.addressInfo.longitude,
          }}
          pinColor="limegreen"
        />
      );
    }
    return props.items.map((item) => (
      <Marker
        key={item.id}
        coordinate={{
          latitude: item.addressInfo.latitude,
          longitude: item.addressInfo.longitude,
        }}
        pinColor="limegreen"
        onPress={() => props.onMarkerSelected(item.id)}
      />
    ));
  }, [props.selectedChargingStation, props.items]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={deviceRegion}
        region={selectedRegion}
        provider="google"
        customMapStyle={mapStyle}
        onPress={() => props.onMarkerSelected(null)}>
        {markers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  map: {
    flex: 1,
  },
});
