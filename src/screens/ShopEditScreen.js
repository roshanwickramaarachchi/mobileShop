import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, {Marker} from 'react-native-maps';

const ShopEditScreen = ({navigation}) => {
  const shopData = navigation.getParam('shopData'); // this is shop data get from ProfileScreen
  console.log(
    'success get shop data from ProfileScreen, shop name: ' + shopData.name,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(shopData.image); // this is encorded image data
  const [name, setName] = useState(shopData.name);
  const [description, setDescription] = useState(shopData.description);
  const [latitude, setLatitude] = useState(shopData.latitude);
  const [longitude, setLongitude] = useState(shopData.longitude);
  const [town, setTown] = useState(shopData.town);
  const [address, setAddress] = useState(shopData.address);
  const [phone, setPhone] = useState(shopData.phone);
  const [email, setEmail] = useState(shopData.email);
  const [website, setWebsite] = useState(shopData.website);
  const [fix, setFix] = useState(1); // this is for fix location button error
  const [errorMessage, setErrorMessage] = useState('');
  const [shopId, setShopId] = useState();
  

  //   // get relevent logged user created shop data --- this method also work
  //   const getShopData = async () => {
  //     try {
  //       var token = await AsyncStorage.getItem('token'); // get Token from async storage
  //       // calling api get logged user data using token
  //       const userData = await mobileShopApi.get('/api/v1/auth/me', {
  //         headers: {
  //           Authorization: 'Bearer ' + token,
  //         },
  //       });
  //       console.log('user _id ' + userData.data.data._id)
  //       // calling api get logged user created shop data
  //       const response = await mobileShopApi.get('/api/v1/bootcamps', {
  //         params: {
  //           user: userData.data.data._id,
  //         },
  //       });
  //       setShopData(response.data.data[0]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   console.log(shopData.name);

  // // run this arror funcion only when components is first rerender
  // useEffect(() => {
  //   getShopData();
  // }, []);

  // edit shop details using api(put data to database)
  const editShop = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/api/v1/bootcamps/${shopData._id}`,
        headers: {
          //'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          image,
          name,
          description,
          latitude,
          longitude,
          town,
          address,
          phone,
          email,
          website,
        },
      });
      //console.log(response.data.data.name);
      console.log('success edit shop, shop name: ' + response.data.data.name);
      navigation.navigate('Profile');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call ' + err);
      setIsLoading(false); // for loading spinner
      setErrorMessage('Something went wrong');
    }
  };

  // using image picker get image from camera, and get image data
  const takePhotoFromCamera = () => {
    const options = {
      title: 'pick an image',
      //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, (response) => {
      //console.log('Response = ', response);
      console.log(
        'success get image from camera, fileName: ' + response.fileName,
      );

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri; // image uri
        //console.log(uri);

        // using image uri image convert to base64
        ImgToBase64.getBase64String(uri)
          .then(
            (base64String) =>
              setImage(`data:${response.type};base64,` + base64String), // image convert base64 and set setImage state, image type allso add hear
          )
          .catch((err) => console.log(err));
      }
    });
  };

  // using image picker get image from galary, and get image data
  const takePhotoFromLibrary = () => {
    const options = {
      title: 'pick an image',
      //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);
      console.log(
        'success get image from library, fileName: ' + response.fileName,
      );

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        //const source = {uri: response.uri};
        //console.log(response);
        const uri = response.uri; // image uri
        // console.log(uri);

        //using image uri convert image to base64
        ImgToBase64.getBase64String(uri)
          .then(
            (base64String) =>
              setImage(`data:${response.type};base64,` + base64String), // image convert base64 and set setImage state, image type allso add hear
          )
          .catch((err) => console.log(err));
      }
    });
  };
  //console.log(image);

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      {/* loading-spinner-overlay, until get shop data and edited data put to database, this will run */}
      <Spinner
        visible={isLoading}
        // textContent={'Editing...'}
        textStyle={styles.spinnerTextStyle}
      />

      <ScrollView>
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Spacer>
            <Button
              title="take image from camera  "
              onPress={takePhotoFromCamera}
            />
          </Spacer>
          <Spacer>
            <Button
              title="upload image from gallary"
              onPress={takePhotoFromLibrary}
            />
          </Spacer>
          
          {/* shop details */}
          <Text style={styles.label}>Enter Shop Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
          <Text style={styles.label}>Enter Town:</Text>
          <TextInput
            style={styles.input}
            value={town}
            onChangeText={setTown}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
          <Text style={styles.label}>Enter Phone No:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Website:</Text>
          <TextInput
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* ************************************************************************************ */}
          {/* map */}
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
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onPress={(data) => {
              console.log(data.nativeEvent.coordinate);
              setLatitude(data.nativeEvent.coordinate.latitude);
              setLongitude(data.nativeEvent.coordinate.longitude);
            }}
            onMapReady={() => setFix(0)} // this is for fix location button error
          >
            {/* map Marker */}
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              //image={images.mapMarker}
              draggable
              onDragEnd={(data) => {
                //console.log(data.nativeEvent.coordinate);
                setLatitude(data.nativeEvent.coordinate.latitude);
                setLongitude(data.nativeEvent.coordinate.longitude);
              }}
              title={shopData.name}
            />
          </MapView>  
          {/* ********************************************************************************** */}
          

          <Spacer>
            <Button title="save shop" onPress={editShop} />
          </Spacer>
        </View>
      </ScrollView>
    </View>
  );
};

ShopEditScreen.navigationOptions = () => {
  return {
    title: 'Shop Edit Screen',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#0f8bf1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  label: {
    marginBottom: 10,
    marginLeft: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default ShopEditScreen;
