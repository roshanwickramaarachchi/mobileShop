import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import mobileShopApi from './../api/mobileShopApi';
import {Button} from 'react-native-elements';

const ShopSearchScreen = () => {
  const [term, setTerm] = useState('');
  const [term2, setTerm2] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // get data from Api
  const searchApi = async (/*searchTerm*/) => {
    try {
      const response = await mobileShopApi.get('/api/v1/bootcamps', {
        params: {
          //homeTown: searchTerm,
          homeTown: term,
          name: term2,
        },
      });
      setResults(response.data);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };
  console.log(results);

  // run this arror funcion only when components is first rerender
  //the is no parameter pass, so all shop details get
  useEffect(() => {
    searchApi();
  }, []);

  return (
    <View>
      <Text style={styles.headerFont}>mobile shop seach</Text>

      <SearchBar
        term={term}
        onTermChange={setTerm}
        //onTermSubmit={() => searchApi(term)}
      />

      <SearchBar
        term={term2}
        onTermChange={setTerm2}
        //onTermSubmit={() => searchApi(term)}
      />
      <Button title="search" onPress={() => searchApi()} />

      {errorMessage ? <Text>{errorMessage}</Text> : null}
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
