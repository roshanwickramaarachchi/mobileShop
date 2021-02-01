import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {images} from '../../constants';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('ResolveAuth');
  }, 3000);

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
