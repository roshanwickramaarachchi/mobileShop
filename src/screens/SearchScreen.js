import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';

const SearchScreen = ({navigation}) => {
  return (
    <View>
      <Spacer>
        <Button
          title="search shops"
          onPress={() => navigation.navigate('ShopSearch')}
        />
      </Spacer>
      <Spacer>
        <Button
          title="search phones"
          onPress={() => navigation.navigate('PhoneSearch')}
        />
      </Spacer>
    </View>
  );
};

SearchScreen.navigationOptions = () => {
  return {
    title: 'Search Screen',
    headerTitleAlign: 'center',
    // headerTitleStyle: {
    //   textAlign: 'center',
    //   flex:1,
    // },
  };
};

const styles = StyleSheet.create({});

export default SearchScreen;
