import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
//import {Feather} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
  return (
    <View style={styles.backgroundStyle}>
      {/* seachbar icon */}
      <Icon name="search" style={styles.iconStyle} />

      {/* searcbar input */}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search "
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 2,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 0.1,
    borderColor: 'black',
    
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

export default SearchBar;

