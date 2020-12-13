import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import mobileShopApi from './../api/mobileShopApi';

const ShopScreen = ({navigation}) => {
  
  const [result, setResult] = useState(null); // result = one shop data
  // this is way to  get information as sesond argument
  const id = navigation.getParam('id'); // this id is tuched, shop id  

  // get selected shop data using api
  const getResult = async (id) => {
    const response = await mobileShopApi.get(`/api/v1/bootcamps/${id}`);
    setResult(response.data.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  console.log(result.name);

  return (
    <View>
      <Text>{result.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShopScreen;
