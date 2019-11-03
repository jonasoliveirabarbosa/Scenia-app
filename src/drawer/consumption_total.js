import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ConsumptionTotal from '../views/consumption_total';

import config from '../config/stack';

const ListsDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: ConsumptionTotal,

      navigationOptions: ({ navigation }) => ({
        title: 'Consumo Geral',
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: '#abcf32'
        },
        headerLeft: (
          <Icon
            name="menu"
            size={30}
            type="entypo"
            iconStyle={{ paddingLeft: 10 }}
            onPress={navigation.toggleDrawer}
          />
        ),
      }),
    },
  },
  config,
);

ListsDrawerItem.navigationOptions = {
  drawerLabel: 'Consumo Geral',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="chart-line-variant"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material-community"
      color={tintColor}
    />
  ),
};

export default ListsDrawerItem;
