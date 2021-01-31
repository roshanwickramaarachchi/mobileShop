import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {images} from '../../constants';
import MapView, {Marker} from 'react-native-maps';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ProfileScreen = ({navigation}) => {
  const [fix, setFix] = useState(1); // this is for fix location button error
  const [isLoading, setIsLoading] = useState(false); //for loading spinner
  const [loadingText, setLoadingText] = useState(''); //for loading spinner text
  const {signout} = useContext(AuthContext);
  // const [userId, setUserId] = useState(); // using token get logged user id
  const [shopData, setShopData] = useState();
  const [errorMessage, setErrorMessage] = useState('');

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
      setLoadingText('Loading...'); // for loading spinner text
      setIsLoading(true); // for loading spinner
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
      console.log('success get shop');
      setIsLoading(false); //for loading spinner
      setLoadingText(''); //for loading spinner text
      setErrorMessage('');
    } catch (err) {
      console.log('api call getShopData ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };
  //console.log('shop name ' + shopData.name);

  // delete logged user created shop
  const deleteShop = async () => {
    try {
      setLoadingText('Deleting...'); //for loading spinner text
      setIsLoading(true); //for loading spinner
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
      setIsLoading(false); //for loading spinner
      setLoadingText(''); //for loading spinner text
      setErrorMessage('');
    } catch (err) {
      console.log('api call deleteShop ' + err);
      setIsLoading(false); //for loading spinner
      setErrorMessage('Something went wrong');
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
    <View>
      {/* error message */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      {/* loading-spinner-overlay, until get shop data from database this will run */}
      <Spinner
        visible={isLoading}
        textContent={loadingText}
        textStyle={styles.spinnerTextStyle}
      />

      <ScrollView>
        {/* {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'#0000ff'} />
        </View>
      ) : null} */}

        {/* <NavigationEvents onWillFocus={getLoggedUserDataFromToken} />  */}
        {/* when navigate to the screen every time getShopData(userId) function calle */}
        {/* <NavigationEvents onDidBlur={() => getShopData(userId)} /> */}
        <NavigationEvents onWillFocus={() => getShopData()} />

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
          <View>
            <View style={{flex: 1}}>
              {/*shop image, if not image upload yet then default image will see */}
              {shopData.image ? (
                <Image
                  style={styles.shopImage}
                  source={{uri: shopData.image}}
                />
              ) : (
                <Image style={styles.shopImage} source={images.defaultImage} />
              )}
              {/* ******************************************************************************************* */}
              {/* shop details */}
              <View style={styles.fontDetails}>
                <AirbnbRating
                  isDisabled
                  count={10}
                  showRating={false}
                  selectedColor="#0f8bf1"
                  defaultRating={shopData.averageRating}
                  size={15}
                  starContainerStyle={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProfileReviews', {shopId: shopData.id})
                  }>
                  <Text style={styles.reviewTitle}>Rating and reviews</Text>
                </TouchableOpacity>

                <Text>Rating: {shopData.averageRating}</Text>
                <Text>Name: {shopData.name}</Text>
                <Text>Description: {shopData.description}</Text>
                <Text>Phone No: {shopData.phone}</Text>
                <Text>Email: {shopData.email}</Text>
              </View>
            </View>
            {/* map ********************************************************************************************/}
            <MapView
              style={{
                height: 300,
                width: '95%',
                marginTop: fix, // this is for fix location button error
                marginBottom: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 8,
              }}
              region={{
                latitude: Number(shopData.latitude),
                longitude: Number(shopData.longitude),
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              onMapReady={() => setFix(0)} // this is for fix location button error
            >
              {/* map Marker */}
              <Marker
                coordinate={{
                  latitude: Number(shopData.latitude),
                  longitude: Number(shopData.longitude),
                }}
                //image={images.mapMarker}
                // draggable
                title={shopData.name}
              />
            </MapView>
            {/* ********************************************************************************** */}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

ProfileScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'ProfileScreen',
    headerTitleAlign: 'center',
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AdminUsersSearch')}>
        <Icon name="admin-panel-settings" size={25} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  shopImage: {
    height: 200,
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  fontDetails: {
    paddingLeft: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ProfileScreen;
