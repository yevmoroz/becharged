import { useEffect, useState } from 'react';

import { OptionalLocationDetails } from '../location/hooks';
import { ApiError, fetchApi, getApiUrlForPath } from '../open-charge-map/utils';

type CharginStationDataItem = {
  addressInfo: {
    title: string;
    distance: number; // in km
  };
};

type OptionalApiError = ApiError | null;
type OptionalChargingStationsResponse = CharginStationDataItem[] | null;

export const useChargingStationsByLocation = (
  location: OptionalLocationDetails,
  rangeInKm: number
): [OptionalChargingStationsResponse, OptionalApiError] => {
  const [result, setResult] = useState<OptionalChargingStationsResponse>(null);
  const [error, setError] = useState<OptionalApiError>(null);
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
      fetchApi(poiUrl).then(setResult).catch(setError);
    }
  }, [poiUrl]);

  return [result, error];
};
