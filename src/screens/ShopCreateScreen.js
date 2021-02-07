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
// import mobileShopApi from '../api/mobileShopApi';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ShopForm from '../components/ShopForm';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
//import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import Spinner from 'react-native-loading-spinner-overlay';
import {images} from '../../constants';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const ShopCreateScreen = ({navigation}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [fix, setFix] = useState(1); // this is for fix location button error
  const [isLoading, setIsLoading] = useState(false);
  //const [token, setToken] = useState('');
  const [image, setImage] = useState(); // this is encorded image data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [town, setTown] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  // avoid loading spinner run limitlus time
  // useEffect(() => {
  //   setInterval(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // create shop using api(post data to database)
  const createShop = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/bootcamps`,
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
        headers: {
          //'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success create shop');
      navigation.navigate('Profile');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call createShop ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };
  //******************************************************************************************
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
      console.log('success get image from camera');

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } /*else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }*/ else {
        //const source = {uri: response.uri};
        //console.log(source);
        const uri = response.uri; // image uri
        //console.log(uri);

        // using image uri image convert to base64
        ImgToBase64.getBase64String(uri)
          .then(
            (base64String) =>
              setImage(`data:${response.type};base64,` + base64String), //converted image set to setImage state
          )
          .catch((err) => console.log(err));

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
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
      console.log('success get image from library');

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } /*else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }*/ else {
        //const source = {uri: response.uri};
        //console.log(response);
        const uri = response.uri; // image uri
        // console.log(uri);

        // using image uri immage convert to base64
        // ImgToBase64.getBase64String(uri)
        //   .then((base64String) => setBase64String(base64String))
        //   .catch((err) => console.log(err));

        //using image uri image convert to base64 data
        ImgToBase64.getBase64String(uri)
          .then(
            (base64String) =>
              setImage(`data:${response.type};base64,` + base64String), //converted image set to setImage state
          )
          .catch((err) => console.log(err));

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };
  //console.log(image);
  //****************************************************************************************
  //get current location
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        // setLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
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
  }, []);

  //**************************************************************************** */
  // // this is anather way to pass authorazation header for specific Ulr
  // const authAxios = axios.create({
  //   baseURL: BASE_URL,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // // create shop using api(post data to database)
  // const createShop = async () => {
  //   try {
  //     const response = await authAxios.post('/api/v1/bootcamps', {
  //       name,
  //       description,
  //     });
  //     console.log(response.data);
  //     // navigate('Home');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //********************************************************************************* */
  // //get token from async storage
  // const getToken = async () => {
  //   try {
  //     const response = await AsyncStorage.getItem('token');
  //     setToken(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(token);

  // // create shop using api(post data to database) => this is anather way
  // const createShop2 = () => {
  //   fetch('http://4d2fe4ba88e8.ngrok.io/api/v1/bootcamps', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + token,
  //     },
  //     body: JSON.stringify({
  //       name,
  //       description,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);
  //************************************************************************************ */
  return (
    <View style={styles.continer}>
      {/* loading-spinner-overlay, until post shop data to database this will run */}
      <Spinner
        visible={isLoading}
        // textContent={'Creating...'}
        textStyle={styles.spinnerTextStyle}
      />

      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      <ScrollView>
        {/* <ShopForm
          onSubmit={(image, name) => {
            ShopCreateScreen(image, name, () => navigation.navigate('Index'));
          }}
        /> */}
        {/* ************************************************************************************************************* */}
        {/*shop image, if not image upload yet then default image will see */}
        {image ? (
          <Image style={styles.ShopImage} source={{uri: image}} />
        ) : (
          <Image style={styles.ShopImage} source={images.defaultImage} />
        )}
        {/* ************************************************************************************************ */}
        <View>
          <Spacer>
            <Button
              title="take photo from camera"
              onPress={takePhotoFromCamera}
            />
          </Spacer>
          <Spacer>
            <Button
              title="upload image from gallery"
              onPress={takePhotoFromLibrary}
            />
          </Spacer>

          <Text style={styles.label}>Enter Shop Name:</Text>
          <TextInput
            placeholder="name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Description:</Text>
          <TextInput
            placeholder="description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
          <Text style={styles.label}>Enter Town:</Text>
          <TextInput
            placeholder="town"
            style={styles.input}
            value={town}
            onChangeText={setTown}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Address:</Text>
          <TextInput
            placeholder="address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
          <Text style={styles.label}>Enter Phone No:</Text>
          <TextInput
            placeholder="phone no"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Email:</Text>
          <TextInput
            placeholder="test@gmail.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Website:</Text>
          <TextInput
            placeholder="https://website.com"
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* ****************************************************************************** */}
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
              //console.log(data.nativeEvent.coordinate);
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
              title={name}
            />
          </MapView>
          {/* ******************************************************************************** */}
          <Spacer>
            <Button title="save shop" onPress={createShop} />
          </Spacer>
        </View>
      </ScrollView>
    </View>
  );
};

ShopCreateScreen.navigationOptions = () => {
  return {
    title: 'Shop Create Screen',
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
  continer: {
    flex: 1,
  },
  ShopImage: {
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

export default ShopCreateScreen;
