import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import SearchBar from '../components/SearchBar';
import AdminUsersResultsList from '../components/AdminUsersResultsList';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {NavigationEvents} from 'react-navigation';

const AdminUsersSearchScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [usersData, setUsersData] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // get all users data
  const getUsersData = async (searchTerm) => {
    try {
      setIsLoading(true);
      var token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/users`,
        params: {
          email: searchTerm,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setUsersData(response.data.data);
      //console.log(response.data.data);
      console.log('success get users data:');
      setIsLoading(false);
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log('api call getUsersData ' + err);
      setIsLoading(false);
    }
  };

  // run this arror funcion only when components is first rerender
  //the is no parameter pass, so all shop details can get
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={() => getUsersData()} />
      {/* loading spinner it will run until api calle finish */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <Text style={styles.headerFont}>users seach</Text>
      {/* search bar */}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => getUsersData(term)}
      />

      <Button
        title="create user"
        onPress={() => navigation.navigate('AdminUserCreate')}
      />
      {/* error messsage indicate in bellow seachbar  */}
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      {/* all suser data passe to AdminUsersResultsList  */}
      <AdminUsersResultsList usersData={usersData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  headerFont: {
    marginTop: 8,
    marginHorizontal: 24,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default AdminUsersSearchScreen;
