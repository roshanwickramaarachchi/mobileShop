import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import mobileShopApi from './../api/mobileShopApi';
import PhoneResultsList from '../components/PhoneResultsList';

const PhoneSearchScreen = () => {

  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]); // results= phones
  const [errorMessage, setErrorMessage] = useState('');

  // get data from Api and data set to 'result'
  const searchApi = async (searchTerm) => {
    try {
      const response = await mobileShopApi.get('/api/v1/courses', {
        params: {
          brand: searchTerm,
        },
      });
      setResults(response.data.data);
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log(err);
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
      <Text style={styles.headerFont}>Phones seach</Text>
      {/* search bar */}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {/* error messsage indicate in seachbar bellow */}
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <PhoneResultsList results={results} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerFont: {
    marginTop: 8,
    marginHorizontal: 24,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default PhoneSearchScreen;
