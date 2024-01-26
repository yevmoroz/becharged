import { Alert } from 'react-native';

import { AppContainer } from '../app-container';
import { Button } from '../button';
import { useDeviceLocation } from '../location/hooks';

const onPressStart = (l) => (): void => {
  let message = 'Might need device locaiton';
  if (l.errorMsg) {
    message = l.errorMsg;
  } else {
    message = `Got you location \nlat: ${l.lat}; lon: ${l.lon}`
  }
  Alert.alert(message);
};

export const Entrance: React.FC = () => {
  const location = useDeviceLocation();

  return (
    <AppContainer>
      <Button onPress={onPressStart(location)}>Find me charging stations</Button>
    </AppContainer>
  );
};
