import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Button} from 'react-native-elements';
import mobileShopApi from './../api/mobileShopApi';
import PhoneListScreen from './PhoneListScreen';

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
        <Button
          title="all phone in the shop"
          onPress={() => navigation.navigate('PhoneList', {id})}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shopImage: {
    width: '95%',
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  fontDetails: {
    paddingLeft: 10,
  },
});

export default ShopScreen;
