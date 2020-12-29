import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Button} from 'react-native';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePhoneScreen = ({navigation}) => {
  const phoneId = navigation.getParam('phoneId'); // this id is one phone id,/ this is way to  get information as sesond argument
  
  const [phoneData, setPhoneData] = useState(null); // phoneData = one  phone data
  const [isLoading, setIsLoading] = useState(false);

  // get tuched phone data using api
  const getPhoneData = async () => {
    setIsLoading(true);
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
    } catch (err) {
      console.log('api call getPhonsData ' + err);
      setIsLoading(false);
    }
  };

  
  // delete viewed phone
  const deletePhone = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
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
    <View>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* viewed phone delete */}
      <Button
        title="edit phone"
        onPress={() => navigation.navigate('PhoneEdit', {phoneData: phoneData})}
      />

      <Button title="delete phone" onPress={deletePhone} />

      <Image style={styles.image} source={{uri: phoneData.image}} />
      <View style={styles.fontDetail}>
        <Text>Price Rs: {phoneData.price}</Text>
        <Text>Brand: {phoneData.brand}</Text>
        <Text>Model: {phoneData.model}</Text>
        <Text>Edition: {phoneData.edition}</Text>
        <Text>Features: {phoneData.features}</Text>
      </View>
    </View>
  );
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
    marginLeft: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ProfilePhoneScreen;
