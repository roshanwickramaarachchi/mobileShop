import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../constants';

const HomeScreen = ({navigation}) => {
  // // Dummy Data for mobile phones flat list
  // ***************************************************************
  const [destinations, setDestinations] = React.useState([
    {
      id: 0,
      name: 'Ski Villa',
      img: images.skiVilla,
    },
    {
      id: 1,
      name: 'Climbing Hills',
      img: images.climbingHills,
    },
    {
      id: 2,
      name: 'Frozen Hills',
      img: images.frozenHills,
    },
    {
      id: 3,
      name: 'Beach',
      img: images.beach,
    },
  ]);
  // *****************************************************************
  // // Render for mobile phones flatlist

  function renderDestinations(item, index) {
    var destinationStyle = {};

    if (index == 0) {
      destinationStyle = {marginLeft: 24};
    }

    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginHorizontal: 8,
          ...destinationStyle,
        }}
        onPress={() => navigation.navigate('Search')}>

        <Image
          source={item.img}
          resizeMode="cover"
          style={{
            width: 90,
            height: '82%',
            borderRadius: 15,
          }}
        />

        <Text style={{marginTop: 4}}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  //*******************************************************************
  return (
    <View style={styles.container}>
      <Text style={styles.headerFont}>Mobile Shops</Text>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <View style={styles.sliderContainer}>
            <Swiper autoplay height={200}>
              <View style={styles.slide}>
                <Image
                  source={images.skiVilla}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={images.climbingHills}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={images.frozenHills}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{flex: 1}}>
        <Text style={styles.headerFont}>mobile phones</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={destinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => renderDestinations(item, index)}
        />
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    title: 'Home Screen',
    headerTitleStyle: {justifyContent: 'center'},
    headerLeft: () => (
      <TouchableOpacity>
        <Icon name="ios-menu" size={25} />
      </TouchableOpacity>
    ),
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
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default HomeScreen;
