import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import mobileShopApi from './../api/mobileShopApi';
import PhoneResultsList from '../components/PhoneResultsList';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../components/Spacer';

const PhoneSearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]); // results= phones
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner
  const [searchKeyword, setSearchKeyword] = useState('brand'); //user can select one keyword using drop down picker

  // get data from Api and data set to 'result'
  const searchApi = async (searchTerm) => {
    setIsLoading(true); // for loading spinner
    try {
      const response = await mobileShopApi.get('/api/v1/courses', {
        params: {
          brand: searchTerm,
        },
      });
      setResults(response.data.data);
      setIsLoading(false); // for loading spinner
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log(err);
      setIsLoading(false); // for loading spinner
    }
  };
  //console.log(results);

  // get all users data, also can d=search and then get relevent shop data
  const getShopsData = async (searchTerm) => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/courses?${searchKeyword}=${searchTerm}`,
        // params: {
        //   town: searchTerm,
        // },
      });
      setResults(response.data.data);
      console.log(response.data);
      console.log('success get phone data:');
      setIsLoading(false); // for loading spinner
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log('api call getPhoneData ' + err);
      setIsLoading(false); // for loading spinner
    }
  };

  // run this arror funcion only when components is first rerender
  //the is no parameter pass, so all shop details can get
  useEffect(() => {
    getShopsData();
  }, []);

  return (
    <View>
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
        onTermSubmit={() => searchApi(term)}
      />

      <Text style={styles.text}>select item for search</Text>
      {/* drop down selct picker */}
      <Spacer>
        <DropDownPicker
          items={[
            {
              label: 'phone brand',
              value: 'brand',
              hidden: true,
            },
            {
              label: 'phone model',
              value: 'model',
            },
          ]}
          defaultValue={searchKeyword}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setSearchKeyword(item.value)}
        />
      </Spacer>

      <PhoneResultsList results={results} />
    </View>
  );
};

PhoneSearchScreen.navigationOptions = () => {
  return {
    title: 'Phone Search Screen',
    headerTitleAlign: 'center',
    // headerTitleStyle: {
    //   textAlign: 'center',
    //   flex:1,
    // },
  };
};

const styles = StyleSheet.create({
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
  text: {marginLeft: 10},
});

export default PhoneSearchScreen;
