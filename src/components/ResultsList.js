import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ResultsDetail from './ResultsDetail';
import {withNavigation} from 'react-navigation';

const ResultList = ({results, navigation}) => {
  console.log(results.length);
  return (
    <View>
      {/*all the shop list */}
      <FlatList
        data={results}
        keyExtractor={(result) => result.id} // _id use as id
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Shop', {id: item._id})}>
              {/* onPress={() => console.log(item._id)}> */}
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

//withNavigation is help navigate, without pass prop through between every pages
export default withNavigation(ResultList);
