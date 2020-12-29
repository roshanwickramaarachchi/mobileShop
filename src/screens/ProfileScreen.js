import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Context as ShopContext} from '../context/ShopContext';
import Spacer from '../components/Spacer';
import {NavigationEvents} from 'react-navigation';
// import jwt_decode from 'jwt-decode';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfileScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {signout} = useContext(AuthContext);
  // const [userId, setUserId] = useState(); // using token get logged user id
  const [shopData, setShopData] = useState();

  // // get token from async storage and get logged user id => this method also correct
  // const getLoggedUserDataFromToken = async () => {
  //   try {
  //     const response = await AsyncStorage.getItem('token');
  //     const decoded = jwt_decode(response);
  //     setUserId(decoded.id); // id= logged user id
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log('user id: ' + userId);

  // // get token from async storage and get logged user id
  // const getLoggedUserDataFromToken = async () => {
  //   try {
  //     var TOKEN = await AsyncStorage.getItem('token');
  //     const userData = await mobileShopApi.get('/api/v1/auth/me', {
  //       headers: {
  //         Authorization: 'Bearer ' + TOKEN,
  //       },
  //     });
  //     setUserId(userData.data.data._id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log('user id: ' + userId);

  // // get relevent logged user created shop data
  // const getShopData = async (searchId) => {
  //   try {
  //     const response = await mobileShopApi.get('/api/v1/bootcamps', {
  //       params: {
  //         user: searchId,
  //       },
  //     });
  //     //console.log(response.data);
  //     setShopData(response.data.data[0]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // // console.log(shopData);

  // get relevent logged user created shop data
  const getShopData = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token'); // get Token from async storage
      // calling api get logged user data using token
      const userData = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/auth/me`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('success get user data, user_id: ' + userData.data.data._id);
      // calling api get logged user created shop data
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/bootcamps`,
        params: {
          user: userData.data.data._id,
        },
      });
      setShopData(response.data.data[0]);
      console.log('success get shop, shop name: ' + response.data.data[0].name);
      setIsLoading(false);
    } catch (err) {
      console.log('api call getShopData ' + err);
      setIsLoading(false);
    }
  };
  //console.log('shop name ' + shopData.name);

  // delete logged user created shop
  const deleteShop = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/bootcamps/${shopData._id}`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response);
      console.log('success delete shop');
      setShopData(null);
      setIsLoading(false);
    } catch (err) {
      console.log('api call deleteShop ' + err);
      setIsLoading(false);
    }
  };

  // run this arror funcion only when components is first rerender
  useEffect(() => {
    //getLoggedUserDataFromToken();
    //getShopData(userId);
    getShopData();
  }, []);

  // using this function call multiple fuction at sametime

  return (
    <ScrollView>
      {/* {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'#0000ff'} />
        </View>
      ) : null} */}

      {/* loading-spinner-overlay, until get shop data from database this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* <NavigationEvents onWillFocus={getLoggedUserDataFromToken} />  */}
      {/* when navigate to the screen every time getShopData(userId) function calle */}
      {/* <NavigationEvents onDidBlur={() => getShopData(userId)} /> */}
      <NavigationEvents onWillFocus={() => getShopData()} />

      <Text style={{fontSize: 48}}>ProfileScreen</Text>
      {/* sign out button */}
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>

      {/* if user created shop in database this button will hide  */}
      {!shopData ? (
        <Spacer>
          <Button
            title="Create Shop"
            onPress={() => navigation.navigate('ShopCreate')}
          />
        </Spacer>
      ) : null}

      {/* if user created shop in database this button will show  */}
      {shopData ? (
        <Spacer>
          <Button
            title="Edit Shop"
            onPress={() => navigation.navigate('ShopEdit', {shopData})} // all shop data pass to shopEditScreen
          />
        </Spacer>
      ) : null}

      {/* if user created shop in database this button will show  */}
      {shopData ? (
        <Spacer>
          <Button title="Delete Shop" onPress={deleteShop} />
        </Spacer>
      ) : null}

      {/* if user created shop in database this button will show  */}
      {shopData ? (
        <Spacer>
          <Button
            title="Show phone List"
            onPress={() =>
              navigation.navigate('ProfilePhones', {shopId: shopData._id})
            }
          />
        </Spacer>
      ) : null}

      {/* view shop */}
      {/* if there is no shop in database(check shopData.name) shop data not view */}
      {shopData ? (
        <View style={{flex: 1}}>
          {/* shop main image */}
          <Image style={styles.shopImage} source={{uri: shopData.image}} />

          {/* shop details */}
          <View style={styles.fontDetails}>
            <Text>Name: {shopData.name}</Text>
            <Text>Description: {shopData.description}</Text>
            <Text>Phone No: {shopData.phone}</Text>
            <Text>Email: {shopData.email}</Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shopImage: {
    width: '95%',
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  fontDetails: {
    paddingLeft: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ProfileScreen;
