import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Spacer from '../components/Spacer';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Button, Input} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewCreateScreen = ({navigation}) => {
  const shopId = navigation.getParam('shopId');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner

  // set review for relevent shop by logged user user
  const createReview = async () => {
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/bootcamps/${shopId}/reviews`,
        data: {
          rating,
          text,
        },
        headers: {
          //'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success create review');
      navigation.navigate('Reviews');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call postReview ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong postReview');
    }
  };

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

      {/* rating input using stir */}
      <AirbnbRating
        count={10}
        showRating={false}
        selectedColor="#0f8bf1"
        defaultRating={1}
        size={15}
        starContainerStyle={{
          alignSelf: 'flex-start',
          backgroundColor: 'transparent',
        }}
        onFinishRating={(value) => setRating(value)}
      />
      {/* comment input */}
      <Text style={styles.label}>Enter Your idea:</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        value={text}
        onChangeText={setText}
      />

      {/* for create review */}
      <Spacer>
        <Button title="submit" onPress={createReview} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ReviewCreateScreen;
