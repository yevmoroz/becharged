import { Fragment, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { FONT_SIZE_TITLE, PAD_XXL, PAD_S, PAD_L } from '../../theme/common';
import { Theme, useTheme } from '../../theme/hooks';
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
  const styles = useTheme(themeableStyles);
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
    <Fragment>
      <Text style={styles.text}>
        Select charging station from the list to begin smooth charging!
      </Text>
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
    </Fragment>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontSize: FONT_SIZE_TITLE,
      marginHorizontal: PAD_XXL,
      marginVertical: PAD_S,
      paddingHorizontal: PAD_S,
      paddingVertical: PAD_L,
      color: theme.colors.PRIMARY,
    },
  });
