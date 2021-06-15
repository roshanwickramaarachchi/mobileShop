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

const ReviewsScreen = ({navigation}) => {
  const shopId = navigation.getParam('shopId');

  const [isLoading, setIsLoading] = useState(false); // for loading spinner  
  const [loggedUserReview, setloggedUserReview] = useState(''); // logged user review
  const [reviews, setReviews] = useState([]); //all reviews of shop
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedUserData, setLoggedUserData] = useState(''); // logged user data

  //console.log(userReview);

  // get logged user created review ,relevent shop
  const getReview = async () => {
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token'); // get Token from async storage
      // calling api get logged user data using token
      const userData = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/auth/me`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setLoggedUserData(userData.data.data); //set logged user data
      console.log(userData.data.data._id);
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/reviews?shop=${shopId}&user=${userData.data.data._id}`,
      });

      setloggedUserReview(response.data.data[0]);
      //console.log(response.data.data[0]);
      console.log('success get logged user review');
      //navigation.navigate('Profile');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('get logged user review error: ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

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
  const deleteReview = async () => {
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token'); // get Token from async storage
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/reviews/${loggedUserReview._id}`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('success delete review');
      setloggedUserReview('');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call delete reviews: ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getReview();
    getReviews();
  }, []);

  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillFocus={() => getReview()} />
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

      {/* logged user review */}
      {loggedUserReview ? (
        <View style={styles.UserReviewContainer}>
          <View style={styles.userReview}>
            <Text>Name: {loggedUserData.name}</Text>
            {/* rating stir */}
            <AirbnbRating
              isDisabled
              count={10}
              showRating={false}
              selectedColor="#0f8bf1"
              defaultRating={loggedUserReview.rating}
              size={15}
              starContainerStyle={{
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
              }}
            />
            <Text>Review: {loggedUserReview.text}</Text>
          </View>

          {/* edit icon */}
          <View style={styles.editIconContainer}>
            <TouchableOpacity
            // onPress={() =>
            //   // navigation.navigate('AdminUserEdit', {userData: userData})
            //   console.log('pressed');
            // }
            >
              <Icon style={styles.icon} name="edit" />
            </TouchableOpacity>
          </View>

          {/* delete icon */}
          <View style={styles.deleteIconContainer}>
            <TouchableOpacity onPress={deleteReview}>
              <Icon style={styles.icon} name="trash" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Spacer>
          <Button
            title="create review"
            onPress={() =>
              navigation.navigate('ReviewCreate', {shopId: shopId})
            }
          />
        </Spacer>
      )}

      {/* all reviews list */}
      <View style={{flex: 5}}>
        <FlatList
          data={reviews}
          keyExtractor={(result) => result._id} // _id use as id
          renderItem={({item}) => {
            if (item.user._id !== loggedUserData._id) {
              return (
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
              );
            }
          }}
        />
      </View>
    </View>
  );
};

ReviewsScreen.navigationOptions = () => {
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
  shopImage: {
    height: 200,
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  fontDetails: {
    paddingLeft: 10,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  airbnbRating: {
    marginLeft: 5,
  },
  // reviewContainer: {
  //   marginLeft: 10,
  //   marginTop: 10,
  // },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  reviewContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'column',
    //justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopColor: '#4169e1',
    borderTopWidth: 1,
  },
  UserReviewContainer: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    //borderTopColor: '#4169e1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingHorizontal: 10,
  },
  userReview: {
    flex: 7,
  },  
  editIconContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  deleteIconContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
});

export default ReviewsScreen;
