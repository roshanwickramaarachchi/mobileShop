import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import MapView, {Marker, Callout} from 'react-native-maps';

const ShopMapScreen = ({navigation}) => {
  const shopData = navigation.getParam('shopData'); // this  is tuched, shop data
  const [fix, setFix] = useState(1); // this is for fix location button error
  return (
    <>
      <MapView
        style={{
          height: '95%',
          width: '95%',
          marginTop: fix, // this is for fix location button error
          marginBottom: 10,
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 8,
        }}
        region={{
          latitude: shopData.latitude,
          longitude: shopData.longitude,
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
            latitude: shopData.latitude,
            longitude: shopData.longitude,
          }}
          //image={images.mapMarker}
          // draggable
          title={shopData.name}
        />
      </MapView>
    </>
  );
};

export default ShopMapScreen;
