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
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]); // results= shops
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading spinner
  const [searchKeyword, setSearchKeyword] = useState('name'); //user can select one keyword using drop down picker

  // this.state = {
  //   country: 'uk',
  // };

  // // get data from Api and data set to 'result'
  // const searchApi = async (searchTerm) => {
  //   try {
  //     setIsLoading(true); // for loading spinner
  //     const response = await mobileShopApi.get('/api/v1/bootcamps', {
  //       params: {
  //         town: searchTerm,
  //       },
  //     });
  //     setResults(response.data.data);
  //     setIsLoading(false); // for loading spinner
  //     setErrorMessage('');
  //   } catch (err) {
  //     setErrorMessage('Something went wrong');
  //     console.log(err);
  //     setIsLoading(false); // for loading spinner
  //   }
  // };
  // //console.log(results);

  // get all users data, also can d=search and then get relevent shop data
  const getShopsData = async (searchTerm) => {
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
      console.log(response.data);
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
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setSearchKeyword(item.value)}
        />
      </Spacer>

      <ResultsList results={results} />
    </View>
  );
};

// ShopSearchScreen.navigationOptions = ({navigation, searchApi}) => {
//   return {
//     title: 'Shop Search Screen',
//     headerTitleAlign: 'center',
//     headerRight: () => (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('MapSearch', {results: results})}>
//         <Icon name="map-outline" size={25} />
//       </TouchableOpacity>
//     ),
//   };
// };

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

export default ShopSearchScreen;
