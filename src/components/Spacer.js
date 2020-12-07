import React from 'react';
import {View, StyleSheet} from 'react-native';

const Spacer = ({children}) => {
  return <View style={styles.Spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  Spacer: {
    margin: 10,
  },
});

export default Spacer;
