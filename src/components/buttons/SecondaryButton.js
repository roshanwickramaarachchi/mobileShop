import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {images} from '../../../constants';

const SecondaryButton = (props) => {
  const {label, background, btnType, fontColor} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={[styles.btn, {backgroundColor: background}]}>
        <Image
          style={styles.socialIcon}
          source={btnType === 'FACEBOOK' ? images.facebook : images.google}
        />
        <Text style={[styles.label, {color: fontColor}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  btn: {
    backgroundColor: '#7583CA',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A1A4B2',
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#ffff',
    fontFamily: 'HelveticaNeue',
    padding: 20,
    alignSelf: 'center',
  },
  socialIcon: {
    position: 'absolute',
    left: 30,
  },
});

export default SecondaryButton;
