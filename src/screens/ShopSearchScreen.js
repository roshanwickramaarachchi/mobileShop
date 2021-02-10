import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import Spinner from 'react-native-loading-spinner-overlay';
import Spacer from '../components/Spacer';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const ShopSearchScreen = ({navigation}) => {
  const [term, setTerm] = useState(''); // search bar text
  const [results, setResults] = useState([]); // shops data
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner
  const [searchKeyword, setSearchKeyword] = useState('town'); //user can select one keyword using drop down picker

  // this.state = {
  //   country: 'uk',
  // };
 

  // search and then get relevent shop data
  const getShopsData = async (searchTerm) => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    try {
      setIsLoading(true); // for loading spinner
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/bootcamps?${searchKeyword}=${searchTerm}`,
        // params: {
        //   town: searchTerm,
        // },
      });
      setResults(response.data.data);
      //console.log(response.data);
      console.log('success get shops data:');
      setIsLoading(false); // for loading spinner
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log('api call getShopsData ' + err);
      setIsLoading(false); // for loading spinner
    }
  };

  // run this arror funcion only when components is first rerender
  //the is no parameter pass, so all shop details can get
  useEffect(() => {
    getShopsData('galle');
  }, []);

  return (
    <View style={styles.container}>
      {/* loading spinner it will run until api calle finish */}
      <Spinner
        visible={isLoading}
        // textContent={'Loading...'}
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
        onTermSubmit={() => getShopsData(term)}
      />

      <Spacer>
        <Button
          title="find in map"
          onPress={() => navigation.navigate('MapSearch', {shopsData: results})}
        />
      </Spacer>
      
      <Text style={styles.text}>select item for search</Text>
      {/* drop down selct picker */}
      <Spacer>
        <DropDownPicker
          items={[
            {
              label: 'shop name',
              value: 'name',
              hidden: true,
            },
            {
              label: 'shop in town',
              value: 'town',
            },
          ]}
          defaultValue={searchKeyword}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#F0EEEE'}}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownStyle={{backgroundColor: '#F0EEEE'}}
          onChangeItem={(item) => setSearchKeyword(item.value)}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000',
          }}
          selectedLabelStyle={{
            color: '#39739d',
          }}
          placeholderStyle={{
            fontWeight: 'bold',
            textAlign: 'center'
        }}
        />
      </Spacer>

      <ResultsList results={results} />
    </View>
  );
};

ShopSearchScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Shop Search Screen',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#0f8bf1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    textAlign: 'center',
  },
  text: {marginLeft: 10},
});

export default ShopSearchScreen;
