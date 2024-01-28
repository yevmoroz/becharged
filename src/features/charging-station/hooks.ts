import { useCallback, useEffect, useState } from 'react';

import { ApiError } from '../api-error';
import { fetchApi as fetchEvEnergyApi } from '../ev-energy/utils';
import { OptionalLocationDetails } from '../location/hooks';
import { fetchApi as fetchOpenChargeMapApi, getApiUrlForPath } from '../open-charge-map/utils';

export type ChargingStationDataItem = {
  id: number;
  addressInfo: {
    title: string;
    distance: number; // in km
  };
};

type OptionalApiError = ApiError | null;
type ChargingStationsResponse = ChargingStationDataItem[];
type OptionalChargingStationsResponse = ChargingStationsResponse | null;

export const useChargingStationsByLocation = (
  location: OptionalLocationDetails,
  rangeInKm: number = 5
): [OptionalChargingStationsResponse, OptionalApiError, boolean] => {
  const [result, setResult] = useState<OptionalChargingStationsResponse>(null);
  const [error, setError] = useState<OptionalApiError>(null);
  const resultNotReady = result === null && error === null;
  const hasCoordinates = location?.latitude && location.longitude;
  const poiUrl = hasCoordinates
    ? getApiUrlForPath('poi', {
        latitude: location.latitude,
        longitude: location.longitude,
        distance: rangeInKm,
      })
    : null;

  useEffect(() => {
    if (poiUrl) {
      fetchOpenChargeMapApi(poiUrl).then(setResult).catch(setError);
    }
  }, [poiUrl]);

  return [result, error, resultNotReady];
};

export const useStartCharging = () => {
  const [result, setResult] = useState<OptionalChargingStationsResponse>(null);
  const [error, setError] = useState<OptionalApiError>(null);

  const onStart = useCallback((chargerId) => {
    fetchEvEnergyApi('chargingsession', 'POST', { user: 1, car_id: 1, charger_id: chargerId })
      .then(setResult)
      .catch(setError);
  }, []);

  return [result, error, onStart];
};
