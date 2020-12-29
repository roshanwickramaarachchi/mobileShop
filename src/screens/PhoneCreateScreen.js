import React, {useState} from 'react';
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

const PhoneCreateScreen = ({navigation}) => {
  const shopId = navigation.getParam('shopId'); // get shop id from ProfilePhonesScreen
  const [isLoading, setIsLoading] = useState(false);  
  const [image, setImage] = useState(); // this is encorded image data
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');  

  // create shop using api(post data to database)
  const createPhone = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/bootcamps/${shopId}/courses`,
        data: {
          image,
          price,
          brand,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success create Phone');
      navigation.navigate('ProfilePhones');
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
  

  return (
    <View>
      {/* loading-spinner-overlay, until post shop data to database this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Creating...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Button title="upload image" onPress={takePhotoFromCamera} />
          <Button title="upload image" onPress={takePhotoFromLibrary} />

          <Text style={styles.label}>Enter Brand:</Text>
          <TextInput
            style={styles.input}
            value={brand}
            onChangeText={setBrand}
          />
          <Text style={styles.label}>Enter Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
          
          <Spacer>
            <Button title="save phone" onPress={createPhone} />
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

export default PhoneCreateScreen;
