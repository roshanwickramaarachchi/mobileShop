import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import PhonesResultsDetail from './PhonesResultsDetail';
import {withNavigation} from 'react-navigation';

const ProfilePhonesResultsList = ({phonesData, navigation}) => {
  console.log(
    'success get phones data, number of phones: ' + phonesData.length,
  );
  return (
    <View>
      {/*user created phone list*/}
      <FlatList
        data={phonesData}
        keyExtractor={(phonesData) => phonesData._id} // _id use as id
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              // navigate with tuched phone's _id, pass _id to ProfilePhoneScreen
              onPress={
                () => navigation.navigate('ProfilePhone', {phoneId: item._id}) //selected phone _id pass to PhofilePhoneScreen
                // navigation.navigate('ProfilePhone', {phoneData: item}) //selected phone data pass to PhofilePhoneScreen
              }>
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
export default withNavigation(ProfilePhonesResultsList);
