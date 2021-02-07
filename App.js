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
import ShopCreateScreen from './src/screens/ShopCreateScreen';
import ShopEditScreen from './src/screens/ShopEditScreen'
import ProfilePhonesScreen from './src/screens/ProfilePhonesScreen';
import ProfilePhoneScreen from './src/screens/ProfilePhoneScreen';
import PhoneCreateScreen from './src/screens/PhoneCreateScreen';
import PhoneEditScreen from './src/screens/PhoneEditScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import AdminUsersSearchScreen from './src/screens/AdminUsersSearchScreen';
import AdminUserCreateScreen from './src/screens/AdminUserCreateScreen';
import AdminUserEditScreen from './src/screens/AdminUserEditScreen';
import MapSearchScreen from './src/screens/MapSearchScreen';
import ReviewsScreen from './src/screens/ReviewsScreen';
import ReviewCreateScreen from './src/screens/ReviewCreateScreen';
import ShopMapScreen from './src/screens/ShopMapScreen';
import ProfileReviewsScreen from './src/screens/ProfileReviewsScreen';
import SplashScreen from './src/screens/SplashScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
// import ResolveAuthscreen from './src/screens/ResolveAuthScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  // ResolveAuth: ResolveAuthscreen, //this page help to go to home page without seening login page
  loginFlow: createStackNavigator({
    Signin: {screen: SigninScreen},
    Signup: {screen: SignupScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
    PasswordReset: {screen: PasswordResetScreen}
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

    Search: {
      screen: createStackNavigator({
        Search: SearchScreen,
        ShopSearch: ShopSearchScreen,
        PhoneSearch: PhoneSearchScreen,
        Shop: ShopScreen,
        Reviews: ReviewsScreen,
        ReviewCreate: ReviewCreateScreen,
        PhoneList: PhoneListScreen,
        ShopMap: ShopMapScreen,
        Phone: PhoneScreen,
        MapSearch: MapSearchScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="ios-search" size={25} style={[{color: tintColor}]} />
          </View>
        ),
      },
    },

    Profile: {
      screen: createStackNavigator({
        Profile: ProfileScreen,
        ShopCreate: ShopCreateScreen,
        ShopEdit: ShopEditScreen,
        ProfilePhones: ProfilePhonesScreen,
        ProfilePhone: ProfilePhoneScreen,
        PhoneCreate: PhoneCreateScreen,
        PhoneEdit: PhoneEditScreen,
        AdminUsersSearch: AdminUsersSearchScreen,
        AdminUserCreate: AdminUserCreateScreen,
        AdminUserEdit: AdminUserEditScreen,
        ProfileReviews: ProfileReviewsScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="ios-person" size={25} style={[{color: tintColor}]} />
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
