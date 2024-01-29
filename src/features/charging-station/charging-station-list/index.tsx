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
  const [selectedChargingStationId, setSelectedChargingStationId] = useState<number | null>(null);
  const [activeChargingStationId, setActiveChargingStationId] = useState<number | null>(null);
  const selectedChargingStation = useMemo(
    () => props.items?.find((item) => item.id === selectedChargingStationId),
    [selectedChargingStationId]
  );

  if (selectedChargingStation) {
    return (
      <ChargingStationDetails
        item={selectedChargingStation}
        isActive={activeChargingStationId === selectedChargingStationId}
        onBack={() => setSelectedChargingStationId(null)}
        onStart={setActiveChargingStationId}
      />
    );
  }

  return (
    <FlatList
      data={props.items}
      renderItem={({ item }) => (
        <ChargingStationListItem item={item} onPress={setSelectedChargingStationId} />
      )}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
    />
  );
};
