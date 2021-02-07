import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Button, ScrollView} from 'react-native';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from '../components/Spacer';
import {NavigationEvents} from 'react-navigation';

const ProfilePhoneScreen = ({navigation}) => {
  const phoneId = navigation.getParam('phoneId'); // this id is one phone id,/ this is way to  get information as sesond argument
  const [isLoading, setIsLoading] = useState(true); // for loading spinner
  const [phoneData, setPhoneData] = useState(null); // phoneData = one  phone data
  
  // const [loadingText, setLoadingText] = useState(''); //for loading spinner text
  const [errorMessage, setErrorMessage] = useState('');

  // get tuched phone data using api
  const getPhoneData = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    // setLoadingText('Loading...'); // for loading spinner text
    setIsLoading(true); // for loding spinner
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/courses/${phoneId}`,
      });
      //console.log(response.data.data);
      console.log(
        'success get selected phone, phone brand: ' + response.data.data.brand,
      );
      setPhoneData(response.data.data);
      setIsLoading(false);
      // setLoadingText(''); // for loading spinner text
      setErrorMessage('');
    } catch (err) {
      console.log('api call getPhonsData ' + err);
      setIsLoading(false); // for loading spinner
      setErrorMessage('Something went wrong');
    }
  };

  // delete viewed phone
  const deletePhone = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    try {
      // setLoadingText('Deleting...'); // for loading spinner text
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/courses/${phoneId}`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response);
      console.log('success delete phone');
      navigation.navigate('ProfilePhones');
      setIsLoading(false); // for loading spinner
      // setLoadingText(''); // for loading spinner text
    } catch (err) {
      console.log('api call deleteShop ' + err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPhoneData();
  }, []);

  // if no phone data in the screen brand:  Price: ....ete, can view , this is use for avoid that
  if (!phoneData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <NavigationEvents onWillFocus={() => getPhoneData()} />
      <Spinner
        visible={isLoading}
        // textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* error message */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      {/* viewed phone delete */}
      <Spacer>
        <Button
          title="edit phone"
          onPress={() =>
            navigation.navigate('PhoneEdit', {phoneData: phoneData})
          }
        />
      </Spacer>
      <Spacer>
        <Button title="delete phone" onPress={deletePhone} />
      </Spacer>

      <Image style={styles.image} source={{uri: phoneData.image}} />
      <View style={styles.fontDetail}>
        <Text>
          <Text style={styles.title}>Price Rs: </Text>
          {phoneData.price}
        </Text>
        <Text>
          <Text style={styles.title}>Brand:</Text> {phoneData.brand}
        </Text>
        <Text>
          <Text style={styles.title}>Model:</Text> {phoneData.model}
        </Text>
        <Text>
          <Text style={styles.title}>Features:</Text> {phoneData.features}
        </Text>
      </View>
    </ScrollView>
  );
};

ProfilePhoneScreen.navigationOptions = () => {
  return {
    title: 'Phone Screen',
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
    width: 385,
    height: 300,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  fontDetail: {
    marginLeft: 15,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  title: {
    fontWeight: 'bold',
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
    textAlign: 'center',
  },
});

export default ProfilePhoneScreen;
