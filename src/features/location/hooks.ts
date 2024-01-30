import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { useState, useEffect, useCallback } from 'react';

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
  latitude: number;
  longitude: number;
};

export type OptionalLocationDetails = LocationDetails | null;
type OptionalError = Error | null;
type RefetchCallback = () => void;

export const useDeviceLocation = (): [
  OptionalLocationDetails,
  OptionalError,
  boolean,
  RefetchCallback,
] => {
  const [location, setLocation] = useState<OptionalLocationDetails>(null);
  const [error, setError] = useState<OptionalError>(null);
  const locationNotReady = location === null && error === null;
  const noCoordinates = !location?.latitude || !location?.longitude;
  const refetchCallback = useCallback(() => {
    setLocation(null);
  }, []);

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

  return [location, error, locationNotReady, refetchCallback];
};
