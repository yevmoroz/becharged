import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { useState, useEffect } from 'react';

const getDeviceCoordinates = async () => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const location = await getCurrentPositionAsync();
  if (!location?.coords) {
    throw new Error('Location is not available');
  }
  return location.coords;
};

export type LocationDetails = {
  latitude: number | null;
  longitude: number | null;
};

export type OptionalLocationDetails = LocationDetails | null;
type OptionalError = Error | null;

export const useDeviceLocation = (): [OptionalLocationDetails, OptionalError] => {
  const [location, setLocation] = useState<OptionalLocationDetails>(null);
  const [error, setError] = useState<OptionalError>(null);
  const noCoordinates = !location?.latitude || !location?.longitude;

  useEffect(() => {
    if (noCoordinates) {
      getDeviceCoordinates()
        .then((l) =>
          setLocation({
            latitude: l.latitude,
            longitude: l.longitude,
          })
        )
        .catch(setError);
    }
  }, [noCoordinates]);

  return [location, error];
};
