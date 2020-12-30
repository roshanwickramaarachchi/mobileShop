import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';

const AdminUserCreateScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // create user
  const createUser = async () => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/users/`,
        data: {
          name,
          email,
          password,
          role,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      //console.log(response.data);
      console.log('success create user');
      //navigation.navigate('ProfilePhones');
      setIsLoading(false);
      navigation.navigate('AdminUsersSearch');
    } catch (err) {
      console.log('api call creatUser ' + err);
      setIsLoading(false);
    }
  };

  return (
    <View>
      {/* loading-spinner-overlay, until post shop data to database this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Creating...'}
        textStyle={styles.spinnerTextStyle}
      />
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
          {/* user password input */}
          <Text style={styles.label}>Enter password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {/* user role input */}
          <Text style={styles.label}>Enter Role:</Text>
          <TextInput style={styles.input} value={role} onChangeText={setRole} />

          <Spacer>
            <Button title="save" onPress={createUser} />
          </Spacer>
        </View>
      </View>
    </View>
  );
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
});

export default AdminUserCreateScreen;
