import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ShopScreen = ({navigation}) => {
  const shopData = navigation.getParam('shopData'); // this  is tuched, shop data  

  return (
    <View>
      <ScrollView>
        <View style={{flex: 1}}>
          {/* shop main image */}
          <Image style={styles.shopImage} source={{uri: shopData.image}} />

          {/* shop details */}
          <View style={styles.fontDetails}>
            <AirbnbRating
              isDisabled
              count={10}
              showRating={false}
              selectedColor="#0f8bf1"
              defaultRating={shopData.averageRating}
              size={15}
              starContainerStyle={{
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
              }}
            />
            <Text>Rating: {shopData.averageRating}</Text>

            {/* <ReviewsScreen reviews={reviews} userId={userId} /> */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Reviews', {shopId: shopData.id})
              }>
              <Text style={styles.reviewTitle}>Rating and reviews</Text>
            </TouchableOpacity>

            <Text>Name: {shopData.name}</Text>
            <Text>Address: {shopData.address}</Text>
            <Text>Phone No: {shopData.phone}</Text>
            <Text>Email: {shopData.email}</Text>
          </View>
        </View>

        {/* when press this button shop id is pass to PhoneListScreen, then phone list can view  */}
        <Spacer>
          <Button
            title="all phone in the shop"
            onPress={() => navigation.navigate('PhoneList', {id: shopData._id})}
          />
        </Spacer>

        <Spacer>
          <Button
            title="find in map"
            onPress={() => navigation.navigate('ShopMap', {shopData: shopData})}
          />
        </Spacer>
      </ScrollView>
    </View>
  );
};

ShopScreen.navigationOptions = () => {
  return {
    title: 'Shop Screen',
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
  reviewContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default ShopScreen;
