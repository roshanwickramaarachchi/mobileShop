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
import mobileShopApi from '../api/mobileShopApi';
import Spinner from 'react-native-loading-spinner-overlay';

const ShopCreateScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  ///const [shopData, setShopData] = useState(); // shop data
  //const [token, setToken] = useState('');
  const [image, setImage] = useState(); // this is encorded image data
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [shopId, setShopId] = useState();
  // const [town, setTown] = useState('');
  // const [address, setAddress] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [website, setWebsite] = useState('');

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
      //console.log(response.data.data[0]._id);
      //setShopData(response.data.data[0]);
      setImage(response.data.data[0].image);
      setName(response.data.data[0].name);
      setDescription(response.data.data[0].description);
      setShopId(response.data.data[0]._id);
      console.log('success get shop, shop name: ' + response.data.data[0].name);
      setIsLoading(false);
    } catch (err) {
      console.log('api call ' + err);
      setIsLoading(false);
    }
  };
  //console.log('shop name ' + shopData.name);

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

  // run this arror funcion only when components is first rerender
  useEffect(() => {
    getShopData();
  }, []);

  // edit shop details using api(put data to database)
  const editShop = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/api/v1/bootcamps/${shopId}`,
        headers: {
          //'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          image,
          name,
          description,
          // town,
          // address,
          // phone,
          // email,
          // website,
        },
      });
      //console.log(response.data.data.name); 
      console.log('success edit shop, shop name: ' + response.data.data.name);
      navigation.navigate('Profile');
      setIsLoading(false);
    } catch (err) {
      console.log('api call ' + err);
      setIsLoading(false);
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
    <View>

      {/* loading-spinner-overlay, until get shop data and edited data put to database, this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <ScrollView>
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Button title="upload image" onPress={takePhotoFromCamera} />
          <Button title="upload image" onPress={takePhotoFromLibrary} />

          <Text style={styles.label}>Enter Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.label}>Enter Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          {/* <Text style={styles.label}>Enter Town:</Text>
          <TextInput style={styles.input} value={town} onChangeText={setTown} />
          <Text style={styles.label}>Enter Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>Enter Phone No:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={styles.label}>Enter Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Enter Website:</Text>
          <TextInput
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
          /> */}
          <Spacer>
            <Button title="save shop" onPress={editShop} />
          </Spacer>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default ShopCreateScreen;
