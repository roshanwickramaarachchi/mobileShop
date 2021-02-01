import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withNavigation} from 'react-navigation';

const AdminUsersResultsDetail = ({userData, navigation}) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({userData});
  //console.log(userData.name);

  // delete user data
  const deleteUser = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');

      const userDataFromToken = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/auth/me`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(
        'success get user data from token, user_id: ' +
          userDataFromToken.data.data._id,
      );

      //if selected user email and user email is get using token, equl, then can not delet selected user(can not delete admin data)
      if (userDataFromToken.data.data.email !== userData.email) {
        const response = await axios({
          method: 'delete',
          url: `${BASE_URL}/api/v1/users/${userData._id}`,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        //console.log(response);
        console.log('success delete user');
        setData(null);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log('api call deleteShop ' + err);
      setIsLoading(false);
    }
  };

  //when delete user , then return will null, so then relevent user date in flat list will invisible
  if (!data) {
    return null;
  }

  return (
    
    // individual user data in flat list
    <View style={styles.container}>
      {/* loading spinner */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* user details */}
      <View style={styles.textContainer}>
        <Text style={styles.fontName}>name: {userData.name}</Text>
        <Text>email: {userData.email}</Text>
        <Text>role: {userData.role}</Text>
      </View>

      {/* edit icon */}
      <View style={styles.editIconContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AdminUserEdit', {userData: userData})
          }>
          <Icon style={styles.icon} name="edit" />
        </TouchableOpacity>
      </View>

      {/* delete icon */}
      <View style={styles.deleteIconContainer}>
        <TouchableOpacity onPress={deleteUser}>
          <Icon style={styles.icon} name="trash" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    paddingVertical: 10,
    borderTopColor: '#4169e1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 7,
  },
  editIconContainer:{
    flex: 1,
  },
  deleteIconContainer:{
    flex: 1,
  },
  fontName: {
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 24,
  },
});

export default withNavigation(AdminUsersResultsDetail);
