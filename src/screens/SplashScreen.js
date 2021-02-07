import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {images} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  // Check token in async storeage, and login.  if token is hre the navigate to home screen
  const tryLocalSignin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('Home');
      return null;
    } else {
      navigation.navigate('Signin');
    }
  };

  // useEffect(() => {
  //   tryLocalSignin();
  // }, []);

  // setTimeout(() => {
  //   navigation.navigate('ResolveAuth');
  // }, 3000);

  setTimeout(() => {
    tryLocalSignin();    
  }, 3000)


  return (
    <View style={styles.container}>
      <Image source={images.phone} style={styles.imageStyle} />
    </View>
  );


};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  imageStyle: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
