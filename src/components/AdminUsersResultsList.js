import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AdminUsersResultsDetail from './AdminUsersResultsDetail';
import {withNavigation} from 'react-navigation';


const AdminUsersResultList = ({usersData, navigation}) => {
  //console.log('usersData');
  return (
    <View>
      {/*all users list*/}
      <FlatList
        data={usersData}
        keyExtractor={(results) => results._id} // _id use as id
        renderItem={({item}) => {
          return (
            <View>
              {/* single user data pass to   AdminUsersResultsDetail*/}
              <AdminUsersResultsDetail userData={item} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

//withNavigation is help navigate, without pass prop through between every pages
export default withNavigation(AdminUsersResultList);
