import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ConsumptionNow from '../views/consumption_now';

import config from '../config/stack';

const ListsDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: ConsumptionNow,

      navigationOptions: ({ navigation }) => ({
        title: 'Consumo Agora',
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
  drawerLabel: 'Consumo Agora',
  drawerIcon: ({ tintColor }) => (
    <Icon
        name="home"
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
