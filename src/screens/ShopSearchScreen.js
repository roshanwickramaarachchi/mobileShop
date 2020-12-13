import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import mobileShopApi from './../api/mobileShopApi';
import {Button} from 'react-native-elements';
import ResultList from '../components/ResultsList';

const ShopSearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]); // results= shops
  const [errorMessage, setErrorMessage] = useState('');

  // get data from Api aad data set to 'result'
  const searchApi = async (searchTerm) => {
    try {
      const response = await mobileShopApi.get('/api/v1/bootcamps', {
        params: {
          homeTown: searchTerm,
        },
      });
      setResults(response.data.data);
    } catch (err) {
      setErrorMessage('Something went wrong');
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
      <Text style={styles.headerFont}>mobile shop seach</Text>
      {/* search bar */}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {/* error messsage indicate in seachbar bellow */}
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <ResultList results={results} />
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

export default ShopSearchScreen;
