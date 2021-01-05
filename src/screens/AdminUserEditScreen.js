import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';

const AdminUserCreateScreen = ({navigation}) => {
  const userData = navigation.getParam('userData'); // this is user data get from AdminUserResultsDetailScreen
  console.log(
    'success get user data from adminUserResultsDetail, shop name: ' +
      userData.name,
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [role, setRole] = useState(userData.role);


  // edit user
  //admin can not edit data
  const editUser = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');

      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/api/v1/users/${userData._id}`,
        data: {
          name,
          email,
          role,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success eddit user, user name: ');
      setIsLoading(false); // for loading spinner
      navigation.navigate('AdminUsersSearch');
      setErrorMessage('');
    } catch (err) {
      console.log('api call editUser ' + err);
      setIsLoading(false); // for loading spinner
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <View>
      {/* loading-spinner-overlay, until post shop data to database this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Editing...'}
        textStyle={styles.spinnerTextStyle}
      />
       
      {/* error messsage indicate in bellow seachbar  */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      <View>
        <View>
          {/* user name input */}
          <Text style={styles.label}>Enter Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          {/* user email input */}
          <Text style={styles.label}>Enter Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          {/* user role input*/}
          <Text style={styles.label}>Enter Role:</Text>
          <TextInput style={styles.input} value={role} onChangeText={setRole} />

          <Spacer>
            <Button title="save" onPress={editUser} />
          </Spacer>
        </View>
      </View>
    </View>
  );
};

AdminUserCreateScreen.navigationOptions = () => {
  return {
    title: 'User Edit Screen',
    headerTitleAlign: 'center',
    // headerTitleStyle: {
    //   textAlign: 'center',
    //   flex:1,
    // },
  };
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AdminUserCreateScreen;
