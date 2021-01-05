import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ResultsDetail = ({result}) => {
  //console.log(result.image);
  return (
    // individual shop in flat list
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: result.image}} />
      <View style={styles.textContainer}>
        <Text style={styles.fontShopName}>Name: {result.name}</Text>
        <Text>Town: {result.town}</Text>
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
  fontShopName: {
    fontWeight: 'bold',
  },
  
});

export default ResultsDetail;
