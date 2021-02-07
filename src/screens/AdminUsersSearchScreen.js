import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import SearchBar from '../components/SearchBar';
import AdminUsersResultsList from '../components/AdminUsersResultsList';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {NavigationEvents} from 'react-navigation';
import Spacer from '../components/Spacer';

const AdminUsersSearchScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [usersData, setUsersData] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('user');

  //console.log(usersData);

  const getLoggedUserData = async () => {
    try {
      setIsLoading(true); // for loading spinner
      var token = await AsyncStorage.getItem('token'); // get Token from async storage
      // calling api get logged user data using token
      const loggedUserData = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/auth/me`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setRole(loggedUserData.data.data.role)
    } catch (err) {
      console.log('api call getLogggedUserData ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  // get all users data
  const getUsersData = async (searchTerm) => {
    try {
      setIsLoading(true); // for loading spinner
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
      console.log(response.data.data);
      console.log('success get users data:');
      setIsLoading(false); // for loading spinner
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log('api call getUsersData ' + err);
      setIsLoading(false); // for loading spinner
    }
  };

  // run this arror funcion only when components is first rerender
  //the is no parameter pass, so all shop details can get
  useEffect(() => {    
    getUsersData();
    getLoggedUserData();
  }, []);

  // if logged usersData,is not user or publisher ,then return null 
  if (role === 'user' || role === 'publisher') {
    return null;
  }

  return (
    <View style={styles.container}>
      
      <NavigationEvents onWillFocus={() => getUsersData()} />

      {/* loading spinner it will run until api calle finish */}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      
      {/* error messsage indicate in bellow seachbar  */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

       

      {/* search bar */}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => getUsersData(term)}
      />

      <Spacer>
        <Button
          title="create user"
          onPress={() => navigation.navigate('AdminUserCreate')}
        />
      </Spacer>

      {/* all suser data passe to AdminUsersResultsList  */}
      <AdminUsersResultsList usersData={usersData} />
      
    </View>
  );
};

AdminUsersSearchScreen.navigationOptions = () => {
  return {
    title: 'Search Screen',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#0f8bf1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
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
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AdminUsersSearchScreen;
