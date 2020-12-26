import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import PhonesResultsDetail from './PhonesResultsDetail';
import {withNavigation} from 'react-navigation';

const PhoneResultsList = ({results, navigation}) => {
  console.log(results.length);
  return (
    <View>
      {/*all the shop list */}
      <FlatList
        data={results}
        keyExtractor={(result) => result._id} // _id use as id
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Phone', {id: item._id})}>
              {/* onPress={() => console.log(item._id)}> */}
              <PhonesResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

//withNavigation is help navigate, without pass prop through between every pages
export default withNavigation(PhoneResultsList);
