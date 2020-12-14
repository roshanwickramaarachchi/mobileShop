import React from 'react';
import {View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import PhoneSearchScreen from './src/screens/PhoneSearchScreen';
import ShopSearchScreen from './src/screens/ShopSearchScreen';
import ShopScreen from './src/screens/ShopScreen';
import PhoneScreen from './src/screens/PhoneScreen';
import PhoneListScreen from './src/screens/PhoneListScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthscreen from './src/screens/ResolveAuthScreen';

import Icon from 'react-native-vector-icons/Ionicons';


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthscreen, //this page help to go to home page without seening login page
  loginFlow: createStackNavigator({
    Signin: {screen: SigninScreen},
    Signup: {screen: SignupScreen},
  }),
  mainFlow: createBottomTabNavigator({
    Home: {
      screen: createStackNavigator({
        Home: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="ios-home" size={25} style={[{color: tintColor}]} />
          </View>
        ),
      },
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="ios-person" size={25} style={[{color: tintColor}]} />
          </View>
        ),
      },
    },
    Search: {
      screen: createStackNavigator({
        Search: SearchScreen,
        ShopSearch: ShopSearchScreen,
        PhoneSearch: PhoneSearchScreen,
        Shop: ShopScreen,
        PhoneList: PhoneListScreen,
        Phone: PhoneScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="ios-search" size={25} style={[{color: tintColor}]} />
          </View>
        ),
      },
    },
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
