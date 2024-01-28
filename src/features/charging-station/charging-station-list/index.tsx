import { FlatList } from 'react-native';

import { ChargingStationListItem } from '../charging-station-list-item';
import { ChargingStationDataItem } from '../hooks';

type Props = {
  items: ChargingStationDataItem[];
};

export const ChargingStationList = (props: Props) => {
  return (
    <FlatList
      data={props.items}
      renderItem={({ item }) => <ChargingStationListItem item={item} />}
    />
  );
};
