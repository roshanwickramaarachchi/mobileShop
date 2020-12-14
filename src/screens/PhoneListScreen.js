import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import mobileShopApi from './../api/mobileShopApi';
import PhonesResultsDetail from '../components/PhonesResultsDetail';

const PhoneListScreen = ({navigation}) => {
  const id = navigation.getParam('id'); // this id is shop id find phones in the shop / this is way to  get information as sesond argument
  const [phoneResult, setPhoneResult] = useState(null); // phoneResult = one shop phones data

  // get selected shop, phones data using api
  const getPhoneResult = async (id) => {
    try {
      const response = await mobileShopApi.get(
        `/api/v1/bootcamps/${id}/courses`,
      );
      setPhoneResult(response.data.data); 
    } catch (err) {
      console.log(err);
    }
  };

  // first render this page  getPhoneResult(id); function run

  useEffect(() => {
    getPhoneResult(id);
  }, []);

  if (!phoneResult) {
    return null;
  }

  //console.log(phoneResult);

  return (
    <View>
      <FlatList
        data={phoneResult}
        keyExtractor={(result) => result._id} 
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Phone', {id: item._id})}>
              <PhonesResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

PhoneListScreen.navigationOptions = () => {
  return {
    title: 'Phone List',
    headerTitleStyle: {justifyContent: 'center'},
  };
};

const styles = StyleSheet.create({});

export default PhoneListScreen;
