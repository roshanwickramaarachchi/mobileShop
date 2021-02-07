import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const SignupScreen = ({navigation}) => {
  // const {state, signup, clearErrorMessage} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // sign up
  const signUp = async () => {
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 20000);

    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/auth/register`,
        data: {
          name,
          email,
          password,
        },
      });
      await AsyncStorage.setItem('token', response.data.token);
      //console.log(response.data);
      console.log('success sign up');
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
      navigation.navigate('Home');
    } catch (err) {
      console.log('sign up ' + err);
      setIsLoading(false);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      {/* loading spinner */}
      <Spinner
        visible={isLoading}
        // textContent={'processing...'}
        textStyle={styles.spinnerTextStyle}
      />

      <Spacer>
        <Text style={styles.heading}> Sign Up </Text>
      </Spacer>

      <Input
        placeholder="name"
        leftIcon={<Icon name="account" size={24} color="black" />}
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Spacer />

      <Input
        placeholder="email@address.com"
        leftIcon={<Icon name="email" size={24} color="black" />}
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Spacer />

      <Input
        placeholder="enter atleast 6 cherecter"
        leftIcon={<Icon name="lock" size={24} color="black" />}
        secureTextEntry={true}
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {errorMessage ? (
        <Text style={styles.errorMesssage}>{errorMessage}</Text>
      ) : null}

      <Spacer>
        <Button
          title="Sign Up"
          onPress={() => signUp({name, email, password})}
        />
      </Spacer>

      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Spacer>
          <Text style={styles.link}>
            Already have an accont? Sign in instead
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

// Header remove
SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
  },
  errorMesssage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 30,
    fontWeight: '700',
    // lineHeight: 40,
    textAlign: 'center',
    color: '#3F414E',
  },
});

export default SignupScreen;
