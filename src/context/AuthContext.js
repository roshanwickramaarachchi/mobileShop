import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import mobileShopApi from '../api/mobileShopApi';
import {navigate} from '../navigationRef'; // this will help navigate

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''}; 
    default:
      return state;
  }
};

// Check token in async storeage, and login
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

//Clear error message wen movinge signin and signup screen
const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

// Sign up user
const signup = (dispatch) => async ({name, email, password}) => {
  try {
    const response = await mobileShopApi.post('/api/v1/auth/register', {
      name,
      email,
      password,
    });
    //console.log(response.data);
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
    navigate('Home');
  } catch (err) {
    dispatch({type: 'add_error', payload: 'something wrong with sign up'});
  }
};

// Sign in user
const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await mobileShopApi.post('/api/v1/auth/login', {
      email,
      password,
    });
    //console.log(response.data);
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
    navigate('Home');
  } catch (err) {
    dispatch({type: 'add_error', payload: 'something wrong with sign in'});
    //console.log(err);
  }
};

// Sign out, and removie token and expire cookie
const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  await mobileShopApi.get('/api/v1/auth/logout');
  dispatch({type: 'signout'});
  navigate('Signin');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignin},
  {token: null, errorMessage: ''},
);
