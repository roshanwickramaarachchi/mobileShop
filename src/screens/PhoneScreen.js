import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import mobileShopApi from './../api/mobileShopApi';

const PhoneScreen = ({navigation}) => {
  const id = navigation.getParam('id'); // this id is one phone id,/ this is way to  get information as sesond argument
  const [result, setResult] = useState(null); // result = one  phone data

  // get selected shop, phones data using api
  const getPhoneResult = async (id) => {
    try {
      const response = await mobileShopApi.get(`/api/v1/courses/${id}`);
      setResult(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // first render this page  getPhoneResult(id); function run

  useEffect(() => {
    getPhoneResult(id);
  }, []);

  if (!result) {
    return null;
  }

  console.log(result.brand);

  return (
    <View>
      <Image style={styles.image} source={{uri: result.image}} />
      <View style={styles.fontDetail}>
        <Text>Price Rs: {result.price}</Text> 
        <Text>Brand: {result.brand}</Text>
        <Text>Model: {result.model}</Text>
        <Text>Edition: {result.edition}</Text>
        <Text>Features: {result.features}</Text>
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
});

export default PhoneScreen;
