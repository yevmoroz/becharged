import { useState, useEffect } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export const useDeviceLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return {
    errorMsg,
    lat: location?.coords?.latitude,
    lon: location?.coords?.longitude,
  }
}