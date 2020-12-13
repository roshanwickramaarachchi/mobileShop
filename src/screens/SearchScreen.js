import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';

const ShopSearchScreen = ({navigation}) => {
  return (
    <View>
      <Text style={styles.headerFont}>ShopSearchScreen</Text>
      <Button
        title="search phone shop"
        onPress={() => navigation.navigate('ShopSearch')}
      />
      <Button
        title="search phones"
        onPress={() => navigation.navigate('PhoneSearch')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShopSearchScreen;