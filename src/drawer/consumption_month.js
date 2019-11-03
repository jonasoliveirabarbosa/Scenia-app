import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ConsumptionMonth from '../views/consumption_month';

import config from '../config/stack';

const ListsDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: ConsumptionMonth,

      navigationOptions: ({ navigation }) => ({
        title: 'Consumo Mensal',
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
    drawerLabel: 'Consumo Mensal',
    drawerIcon: ({ tintColor }) => (
    <Icon
        name="calendar"
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
