import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {BASE_URL} from '../../constants/constants';
import Spacer from '../components/Spacer';
import MapView, {Marker, Callout} from 'react-native-maps';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationEvents} from 'react-navigation';

const ProfileReviewsScreen = ({navigation}) => {
  const shopId = navigation.getParam('shopId');

  const [isLoading, setIsLoading] = useState(false); // for loading spinner
  const [reviews, setReviews] = useState([]); //all reviews of shop
  const [errorMessage, setErrorMessage] = useState('');
  const [deletedReviewId, setdeletedReviewId] = useState('');

  //console.log(reviews);

  // get all reviews relevent shop
  const getReviews = async () => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/shops/${shopId}/reviews`,
      });
      //console.log(response.data.data);
      setReviews(response.data.data);
      console.log('success get reviews for shop');
      //navigation.navigate('Profile');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call get reviews: ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  // delete logged user review
  const deleteReview = async (reviewId) => {
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token'); // get Token from async storage
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/reviews/${reviewId}`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setdeletedReviewId(reviewId);
      console.log('success delete review');
      getReviews();
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call delete reviews: ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <NavigationEvents onWillFocus={() => getReviews()} /> */}
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
     

      {/* all reviews list */}
      <FlatList
        data={reviews}
        keyExtractor={(result) => result._id} // _id use as id
        renderItem={({item}) => {
          if (item._id === deletedReviewId) {
            return null;
          }
          return (
            <View style={styles.container}>
              <View style={styles.reviewContainer}>
                <Text>Name: {item.user.name}</Text>
                {/* rating stir */}
                <AirbnbRating
                  isDisabled
                  count={10}
                  showRating={false}
                  selectedColor="#0f8bf1"
                  defaultRating={item.rating}
                  size={15}
                  starContainerStyle={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                  }}
                />
                <Text>Review: {item.text}</Text>
              </View>
              {/* delete icon */}
              <View style={styles.deleteIconContainer}>
                <TouchableOpacity onPress={() => deleteReview(item._id)} >
                  <Icon style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* all reviews list */}
      {/* <FlatList
        data={reviews}
        keyExtractor={(result) => result._id} // _id use as id
        renderItem={({item}) => {
          // if (item._id === deletedReviewId) {
          //   return null;
          // }
          return (
            <View style={styles.container}>
              <View style={styles.userReview}>
                <Text>Name: {item.name}</Text>
                {/* rating stir 
                <AirbnbRating
                  isDisabled
                  count={10}
                  showRating={false}
                  selectedColor="#0f8bf1"
                  defaultRating={item.rating}
                  size={15}
                  starContainerStyle={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                  }}
                />
                <Text>Review: {item.text}</Text>
              </View>

              {/* delete icon 
              <View style={styles.deleteIconContainer}>
                <TouchableOpacity onPress={deleteReview(item._id)}>
                  <Icon style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      /> */}
    </View>
  );
};

ProfileReviewsScreen.navigationOptions = () => {
  return {
    title: 'Reviews Screen',
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
  reviewContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    borderTopColor: '#4169e1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },    
  deleteIconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
});

export default ProfileReviewsScreen;
