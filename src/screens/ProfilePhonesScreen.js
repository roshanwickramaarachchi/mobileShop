import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import ProfilePhonesResultsList from '../components/ProfilePhonesResultsList';
import Spacer from '../components/Spacer';
import {NavigationEvents} from 'react-navigation';

const ProfilePhoneScreen = ({navigation}) => {
  const shopId = navigation.getParam('shopId'); // get shop id from ProfileScreen
  console.log('success get shop _id from ProfileScreen, shop _id: ' + shopId);

  const [isLoading, setIsLoading] = useState(false); // loading spinner
  const [phonesData, setPhonesData] = useState([]);  

  // get logged user created all phone list
  const getPhonesData = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/bootcamps/${shopId}/courses`,
      });
      //console.log(response);
      console.log('success get mobile list, no of phones: ');
      setPhonesData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log('api call getPhonesData ' + err);
      setIsLoading(false);
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
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      {/* if user created shop in database this button will hide  */}

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

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ProfilePhoneScreen;
