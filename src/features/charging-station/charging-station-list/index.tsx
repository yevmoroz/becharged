import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';

import { ChargingStationDetails } from '../charging-station-details';
import { ChargingStationListItem } from '../charging-station-list-item';
import { ChargingStationDataItem } from '../hooks';

type Props = {
  items: ChargingStationDataItem[];
  onRefresh: () => void;
  refreshing: boolean;
};

export const ChargingStationList = (props: Props) => {
  const [activeChargingStationId, setActiveChargingStationId] = useState<number | null>(null);
  const activeChargingStation = useMemo(
    () => props.items?.find((item) => item.id === activeChargingStationId),
    [activeChargingStationId]
  );

  if (activeChargingStation) {
    return <ChargingStationDetails item={activeChargingStation} />;
  }

  return (
    <FlatList
      data={props.items}
      renderItem={({ item }) => (
        <ChargingStationListItem item={item} onPress={setActiveChargingStationId} />
      )}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
    />
  );
};
