import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Spacer from '../components/Spacer';

const PasswordResetScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setpassword] = useState('');

  // reset password using api(using reset token)
  const resetPassword = async () => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/api/v1/auth/resetpassword/${resetToken}`,
        data: {
          password,
        },
      });
      //console.log(response.data);
      console.log('success reset password');
      navigation.navigate('Signin');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call reset password: ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* loading-spinner-overlay, until send email this will run */}
      <Spinner
        visible={isLoading}
        textContent={'processing...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View>
        <Text style={styles.label}>search your mails and enter corde:</Text>
        <TextInput
          placeholder="text"
          style={styles.input}
          value={resetToken}
          onChangeText={setResetToken}
        />

        <Text style={styles.label}>Enter your new password:</Text>
        <TextInput
          placeholder="new password"
          style={styles.input}
          value={password}
          onChangeText={setpassword}
        />

        <Spacer>
          <Button title="reset password" onPress={resetPassword}  />
        </Spacer>

        {errorMessage ? (
          <Text style={styles.errorMesssage}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

PasswordResetScreen.navigationOptions = () => {
  return {
    title: 'Reset Password',
    headerTitleAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    // lineHeight: 40,
    textAlign: 'center',
    color: '#3F414E',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {    
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
    borderRadius: 15,
  },
  label: {
    marginBottom: 10,
    marginLeft: 5,
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default PasswordResetScreen;
