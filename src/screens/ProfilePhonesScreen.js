import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import ProfilePhonesResultsList from '../components/ProfilePhonesResultsList';
import Spacer from '../components/Spacer';
import {NavigationEvents} from 'react-navigation';

const ProfilePhoneScreen = ({navigation}) => {
  const shopId = navigation.getParam('shopId'); // get shop id from ProfileScreen
  console.log('success get shop _id from ProfileScreen, shop _id: ' + shopId);

  const [isLoading, setIsLoading] = useState(true); // loading spinner
  const [phonesData, setPhonesData] = useState([]);  
  const [errorMessage, setErrorMessage] = useState('');

  // get logged user created all phone list
  const getPhonesData = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    setIsLoading(true); // for loading spinner
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/shops/${shopId}/phones`,
      });
      //console.log(response);
      console.log('success get mobile list, no of phones: ');
      setPhonesData(response.data.data);
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call getPhonesData ' + err);
      setIsLoading(false); // for loading spinner
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getPhonesData();
  }, []);

  return (
    <View>
      <NavigationEvents onWillFocus={() => getPhonesData()} />
      
      <Spinner
        visible={isLoading}
        // textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* error message */}
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      <Spacer>
        <Button
          title="Create Phone"
          onPress={() => navigation.navigate('PhoneCreate', {shopId: shopId})}
        />
      </Spacer>

      {/*all phones data pass to ProfilePhoneResultsList*/}
      <ProfilePhonesResultsList phonesData={phonesData} />
    </View>
  );
};

ProfilePhoneScreen.navigationOptions = () => {
  return {
    title: 'Phone List Screen',
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
    textAlign: 'center',
  },
});

export default ProfilePhoneScreen;
