import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import mobileShopApi from './../api/mobileShopApi';
import PhonesResultsDetail from '../components/PhonesResultsDetail';
import Spinner from 'react-native-loading-spinner-overlay';

const PhoneListScreen = ({navigation}) => {
  const id = navigation.getParam('id'); // this id is shop id find phones in the shop / this is way to  get information as sesond argument
  const [phoneResult, setPhoneResult] = useState(null); // phoneResult = one shop phones data
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner

  // get selected shop, phones data using api
  const getPhoneResult = async (id) => {
    setIsLoading(true); // for loading spinner
    try {
      const response = await mobileShopApi.get(
        `/api/v1/bootcamps/${id}/courses`,
      );
      setPhoneResult(response.data.data);
      setErrorMessage('');
      setIsLoading(false); // for loading spinner
    } catch (err) {
      console.log(err);
      setErrorMessage('Something went wrong');
      setIsLoading(false); // for loading spinner
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
      {/* loading spinner it will run until api calle finish */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* error messsage indicate in bellow seachbar  */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

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
    title: 'Phone List Screen',
    headerTitleAlign: 'center',
    // headerTitleStyle: {
    //   textAlign: 'center',
    //   flex:1,
    // },
  };
};

const styles = StyleSheet.create({
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default PhoneListScreen;
