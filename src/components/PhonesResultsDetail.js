import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const PhonesResultsDetail = ({result}) => {
  //console.log(result.brand);
  //results is one phone data
  return (
    // individual phone in flat list
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: result.image}} />
      <View style={styles.textContainer}>
        <Text>
          <Text style={styles.title}>Brand:</Text> {result.brand}
        </Text>
        <Text>
          <Text style={styles.title}>Model:</Text> {result.model}
        </Text>
        <Text>
          <Text style={styles.title}>Price Rs:</Text>
          {result.price}
        </Text>
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
    justifyContent: 'space-around',
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 4,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default PhonesResultsDetail;
