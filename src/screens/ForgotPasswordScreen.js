import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {BASE_URL} from '../../constants/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Spacer from '../components/Spacer';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // forget password using api(send reset token to email)
  const sendResetToken = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/auth/forgotPassword`,
        data: {
          email,
        },
      });
      //console.log(response.data);
      console.log('success send mail');
      navigation.navigate('PasswordReset');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      console.log('api call send email ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* loading-spinner-overlay, until send email this will run */}
      <Spinner
        visible={isLoading}
        textContent={'Sending...'}
        textStyle={styles.spinnerTextStyle}
      />
      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      <View>
        <Text style={styles.label}>Enter your email for reset password:</Text>
        <TextInput
          placeholder="email@address.com"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Spacer>
          <Button title="Send" onPress={sendResetToken} />
        </Spacer>
      </View>
    </View>
  );
};

ForgotPasswordScreen.navigationOptions = () => {
  return {
    title: 'Forgot Password',
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
  heading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 30,
    fontWeight: '700',
    // lineHeight: 40,
    textAlign: 'center',
    color: '#3F414E',
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
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
