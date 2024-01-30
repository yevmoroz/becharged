import { useState } from 'react';
import { FlatList } from 'react-native';

import { ChargingStationDetails } from '../charging-station-details';
import { ChargingStationListItem } from '../charging-station-list-item';
import { ChargingStationDataItem, OptionalChargingStationDataItem } from '../hooks';

type Props = {
  items: ChargingStationDataItem[];
  selectedChargingStation: OptionalChargingStationDataItem;
  onChargingStationSelected: (id: number | null) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

export const ChargingStationList = (props: Props) => {
  const [activeChargingStationId, setActiveChargingStationId] = useState<number | null>(null);

  if (props.selectedChargingStation) {
    return (
      <ChargingStationDetails
        item={props.selectedChargingStation}
        isActive={activeChargingStationId === props.selectedChargingStation?.id}
        onBack={() => props.onChargingStationSelected(null)}
        onStart={setActiveChargingStationId}
      />
    );
  }

  return (
    <FlatList
      data={props.items}
      renderItem={({ item }) => (
        <ChargingStationListItem
          item={item}
          onChargingStationSelected={props.onChargingStationSelected}
        />
      )}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
    />
  );
};
