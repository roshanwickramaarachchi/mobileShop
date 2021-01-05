import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import mobileShopApi from './../api/mobileShopApi';
import ResultsList from '../components/ResultsList';
import Spinner from 'react-native-loading-spinner-overlay';

const ShopSearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]); // results= shops
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner

  // get data from Api and data set to 'result'
  const searchApi = async (searchTerm) => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await mobileShopApi.get('/api/v1/bootcamps', {
        params: {
          town: searchTerm,
        },
      });
      setResults(response.data.data);
      setIsLoading(false); // for loading spinner
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log(err);
      setIsLoading(false); // for loading spinner
    }
  };
  //console.log(results);

  // run this arror funcion only when components is first rerender
  //the is no parameter pass, so all shop details can get
  useEffect(() => {
    searchApi();
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
      
      <ResultsList results={results} />
    </View>
  );
};

ShopSearchScreen.navigationOptions = () => {
  return {
    title: 'Shop Search Screen',
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
});

export default ShopSearchScreen;
