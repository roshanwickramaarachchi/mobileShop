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

const PhoneEditScreen = ({navigation}) => {
  const phoneData = navigation.getParam('phoneData'); //selected phone data come from ProfilePhonesResultsList
  console.log(
    'success get phone data from ProfilePhonesScreen, phone brand: ' +
      phoneData.brand,
  );

  //const shopId = navigation.getParam('shopId'); // get shop id from ProfilePhonesScreen
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(phoneData.image); // this is encorded image data
  const [price, setPrice] = useState(phoneData.price);
  const [brand, setBrand] = useState(phoneData.brand);
  const [model, setModel] = useState(phoneData.model);
  const [features, setFeatures] = useState(phoneData.features);
  const [errorMessage, setErrorMessage] = useState('');

  // create shop using api(post data to database)
  const editPhone = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/api/v1/courses/${phoneData._id}`,
        data: {
          image,
          price,
          brand,
          model,
          features,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success update Phone');
      navigation.navigate('ProfilePhone');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call edit phone ' + err);
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
        // textContent={'Editing...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* error message */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      <ScrollView>
        <Image style={styles.image} source={{uri: image}} />

        <View>
          <Spacer>
            <Button
              title="take image from camera"
              onPress={takePhotoFromCamera}
            />
          </Spacer>
          <Spacer>
            <Button
              title="take image from gallery"
              onPress={takePhotoFromLibrary}
            />
          </Spacer>

          <Text style={styles.label}>Enter Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Brand:</Text>
          <TextInput
            style={styles.input}
            value={brand}
            onChangeText={setBrand}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Enter Model:</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            autoCapitalize="none"
            autoCorrect={false}
          />          
          <Text style={styles.label}>Enter Features:</Text>
          <TextInput
            style={styles.input}
            value={features}
            onChangeText={setFeatures}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />


          <Spacer>
            <Button title="save phone" onPress={editPhone} />
          </Spacer>
        </View>
      </ScrollView>
    </View>
  );
};

PhoneEditScreen.navigationOptions = () => {
  return {
    title: 'Phone Edit Screen',
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
  image: {
    height: 200,
    width: '95%',
    marginTop: 10,
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
    textAlign: 'center',
  },
});

export default PhoneEditScreen;
