import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {images} from '../../constants';

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View >
        <Image source={images.searchScreen} style={styles.image}/>
      </View>
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
    headerStyle: {
      backgroundColor: '#0f8bf1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
  },
  image: {
    height: 400,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
  }
});

export default SearchScreen;
