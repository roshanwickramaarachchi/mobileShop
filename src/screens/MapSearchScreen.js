import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';

const MapSearchScreen = ({navigation}) => {
  // const shopsData = navigation.getParam('shopsData'); //all shop data
  const [currentLatitude, setcurrentLatitude] = useState(0);
  const [currentLongitude, setcurrentLongitude] = useState(0);
  const [fix, setFix] = useState(1); // this is for fix location button error
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner
  const [shopsData, setShopsData] = useState([]); // shops data

  // console.log(shopsData);

  // get all shop data, 
  const getAllShopsData = async () => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/bootcamps`,
        // params: {
        //   town: searchTerm,
        // },
      });
      setShopsData(response.data.data);
      //console.log(response.data);
      console.log('success get shops data:');
      setIsLoading(false); // for loading spinner
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log('api call getAllShopsData ' + err);
      setIsLoading(false); // for loading spinner
    }
  };

  //get current location
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log(position);
        // setLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
        setcurrentLatitude(position.coords.latitude);
        setcurrentLongitude(position.coords.longitude);
        // setUserLocation(position.coords);
        console.log('success get user current location');
      },
      (err) => {
        // See error code charts below.
        console.log('get user location error: ' + err);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getUserLocation();
    getAllShopsData();
  }, []);
  //array of data, get one by one array data

  var mapMarkers = () => {
    return shopsData.map((item) => (
      //console.log(item),
      <Marker
        key={item.id}
        coordinate={{
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }}
        title={item.name}
        // description={item.description}
        //when preesed callout navigate relevent shop
        onCalloutPress={() => navigation.navigate('Shop', {shopData: item})}>
        <Callout tooltip>
          <View>
            <View style={styles.CalloutBubble}>
              <Text style={styles.calloutName}>{item.name}</Text>
              <Image style={styles.calloutImage} source={{uri: item.image}} />
            </View>
            <View style={styles.calloutArrowBorder} />
            <View style={styles.calloutArrow} />
          </View>
        </Callout>
      </Marker>
    ));
  };

  return (
    <>
      {/* loading spinner it will run until api calle finish */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* error messsage indicate in bellow seachbar  */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyD8tWaYdtAUUZbtNdudMxmp1v01ZNNFG9g',
          language: 'en',
        }}
      /> */}

      <MapView
        style={{
          flex: 1,
          // height: '96%',
          width: '95%',
          marginTop: fix, // this is for fix location button error
          marginBottom: 10,
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 8,
        }}
        region={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => setFix(10)} // this is for fix location button error
      >
        {mapMarkers()}
      </MapView>
    </>
  );
};

MapSearchScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Map Screen',
    headerTitleAlign: 'center',
  };
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 10,
  //   // height: '96%',
  //   width: '95%',
  //   marginTop: fix, // this is for fix location button error
  //   marginBottom: 10,
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   borderRadius: 8,
  // },
  // Callout bubble
  CalloutBubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 5,
    width: 150,
  },
  // Arrow below the bubble
  calloutArrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  calloutArrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  calloutName: {
    fontSize: 16,
    marginBottom: 5,
  },
  calloutImage: {
    width: '100%',
    height: 80,
  },
});

export default MapSearchScreen;
