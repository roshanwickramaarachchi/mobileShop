import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobileShopApi from '../api/mobileShopApi';
import jwt_decode from 'jwt-decode';

const ShopReducer = (state, action) => {
  switch (action.type) {
    // case 'get_user_Data':
    //   return action.payload;
    case 'get_token':
      return action.payload;
    case 'get_shop':
      return action.payload;

    default:
      return state;
  }
};
//get logged user id from token,stored in async storage
const getLoggedUserDataFromToken = (dispatch) => async () => {
  try {
    // //       var TOKEN = await AsyncStorage.getItem('token'); // get Token from async storage
    // //       // calling api get logged user data using koken
    // //       const userData = await mobileShopApi.get('/api/v1/auth/me', {
    // //         headers: {
    // //           Authorization: 'Bearer ' + TOKEN,
    // //         },
    // //       });
    // //       // calling api get logged user created shop data
    // //       const response = await mobileShopApi.get('/api/v1/bootcamps', { 
    // //         params: {
    // //           user: userData.data.data._id,
    // //         },
    // //       });
    // //       setShopData(response.data.data[0]);
    // //     } catch (err) {
    // //       console.log(err);
    // //     }
    // //   };
    // //   // console.log(shopData.name);

// get data from Api and data set to 'result'
const getShop = (dispatch) => async (searchTerm) => {
  try {
    const response = await mobileShopApi.get('/api/v1/bootcamps', {
      params: {
        user: searchTerm,
      },
    });

    dispatch({type: 'get_shop', payload: response.data.data});
  } catch (err) {
    console.log(err);
  }
};
//console.log(results);

// const getLoggedUserData = (dispatch) => async () => {
//   try {
//     const response = await mobileShopApi.get('/api/v1/auth/me');
//     dispatch({type: 'get_user_Data', payload: response.data});
//   } catch (err) {
//     console.log(err);
//   }
// };

export const {Provider, Context} = createDataContext(
  ShopReducer,
  {getLoggedUserDataFromToken, getShop},
  [],
);
