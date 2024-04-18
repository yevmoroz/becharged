import { useCallback, useEffect, useState } from 'react';

import { ApiError } from '../api-error';
import { OptionalLocationDetails } from '../location/hooks';
import { fetchApi as fetchOpenChargeMapApi, getApiUrlForPath } from '../open-charge-map/utils';

export type ChargingStationDataItem = {
  id: number;
  addressInfo: {
    title: string;
    distance: number; // in km
    latitude: number;
    longitude: number;
  };
};

type OptionalApiError = ApiError | null;
type ChargingStationsResponse = ChargingStationDataItem[];
export type OptionalChargingStationDataItem = ChargingStationDataItem | null;
type OptionalChargingStationsResponse = ChargingStationsResponse | null;

/**
 * Charging locations are fetched based on given coordinates
 * when both latitude and longitude are available
 */
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

/**
 * Charging will start when startCharging callback is triggered
 */
export const useStartCharging = (
  chargerId: number,
  onChargingStarted: (chargerId: number) => void
): [ApiError | null, () => void] => {
  const [chargingError, setChargingError] = useState<ApiError | null>(null);

  const startCharging = () => {}
  return [chargingError, startCharging];
};
