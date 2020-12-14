import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const PhonesResultsDetail = ({result}) => {
  //console.log(result.brand);
  return (
    // individual phone in flat list
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: result.image}} />
      <View style={styles.textContainer}>
        <Text style={styles.fontPhoneBrand}>Brand: {result.brand}</Text>
        <Text>Model: {result.model}</Text>
        <Text>Edition: {result.edition}</Text>
        <Text>Price Rs:{result.price}</Text>
        {/* <Text>
        {result.rating} Stars, {result.review_count} Reviews
      </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopColor: '#4169e1',
    borderTopWidth: 1,
  },
  textContainer: {
    marginLeft: 15,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 4,
  },
  fontPhoneBrand: {
    fontWeight: 'bold',
  },
  
});

export default PhonesResultsDetail;
