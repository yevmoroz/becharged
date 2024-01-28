import { FlatList } from 'react-native';

import { ChargingStationListItem } from '../chargin-station-list-item';
import { CharginStationDataItem } from '../hooks';

type Props = {
  items: CharginStationDataItem[];
};

export const ChargingStationList = (props: Props) => {
  return (
    <FlatList
      data={props.items}
      renderItem={({ item }) => <ChargingStationListItem item={item} />}
    />
  );
};
