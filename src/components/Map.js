import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [fix, setFix] = useState(1); // this is for fix location button error

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // setUserLocation(position.coords);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  console.log(location);

  return (
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
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      onPress={(data) => {
        setLocation(data.nativeEvent.coordinate);
        // console.log(data.nativeEvent.coordinate);
      }}
      onMapReady={() => setFix(0)} // this is for fix location button error
      >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        //image={images.mapMarker}
        draggable
        title={'Your Location'}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({});

export default Map;
