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

const ShopCreateScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [token, setToken] = useState('');
  const [image, setImage] = useState(); // this is encorded image data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [town, setTown] = useState('');
  // const [address, setAddress] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [website, setWebsite] = useState('');

  // create shop using api(post data to database)
  const createShop = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/bootcamps`,
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
        headers: {
          //'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success create shop');
      navigation.navigate('Profile');
      setIsLoading(false);
    } catch (err) {
      console.log('api call createShop ' + err);
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
    <View>
      {/* loading-spinner-overlay, until post shop data to database this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Creating...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        {/* <ShopForm
          onSubmit={(image, name) => {
            ShopCreateScreen(image, name, () => navigation.navigate('Index'));
          }}
        /> */}
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
            <Button title="save shop" onPress={createShop} />
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ShopCreateScreen;
