import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import mobileShopApi from './../api/mobileShopApi';
import Spacer from '../components/Spacer';

const ShopScreen = ({navigation}) => {
  const id = navigation.getParam('id'); // this id is tuched, shop id
  const [shopResult, setShopResult] = useState(null); // shopResult = one shop data

  // get selected shop data using api
  const getShopResult = async (id) => {
    try {
      const response = await mobileShopApi.get(`/api/v1/bootcamps/${id}`);
      setShopResult(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // first render this page getShopResult(id) function run

  useEffect(() => {
    getShopResult(id);
  }, []);

  if (!shopResult) {
    return null;
  }

  //console.log(shopResult._id);

  return (
    <View>
      <ScrollView>
        <View style={{flex: 1}}>
          {/* shop main image */}
          <Image style={styles.shopImage} source={{uri: shopResult.image}} />

          {/* shop details */}
          <View style={styles.fontDetails}>
            <Text>Name: {shopResult.name}</Text>
            <Text>Address: {shopResult.address}</Text>
            <Text>Phone No: {shopResult.phone}</Text>
            <Text>Email: {shopResult.email}</Text>
          </View>
        </View>

        {/* when press this button shop id is pass to PhoneListScreen, then phone list can view  */}
        <Spacer>
          <Button
            title="all phone in the shop"
            onPress={() => navigation.navigate('PhoneList', {id})}
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
});

export default ShopScreen;
