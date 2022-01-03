import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Close from 'react-native-vector-icons/Ionicons';
import {connect, useSelector, useDispatch} from 'react-redux';
import COLORS from '../consts/colors';
import {favouriteAction, dataAction} from '../store/actions';

const width = Dimensions.get('window').width / 2 - 30;
const HomeScreen = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [heart, setHeart] = useState(false);
  // const [filterLike, setFilterLike] = useState([]);
  const dispatch = useDispatch();
  const dataStore = useSelector((state) => state.MovieDataReducer);
  const favourite = useSelector((state) => state.FavouriteReducer);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let response = await fetch(
        'https://www.breakingbadapi.com/api/characters',
      );
      let user = await response.json();
      // console.log(user, 'userData');
      setData(user);
      setFilteredData(user);
      dispatch(dataAction(user));
      if (user) {
        setLoading(false);
      }
    } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  }
  const onHandleFavourite = async (fav) => {
    setHeart(!heart);
    // console.log(fav, 'handlefavvvvv');
    await dispatch(favouriteAction(fav));
    // let filterLike = data.map((ele) => ele.name == fav.name);
    // console.log(filterLike, 'filterlikeeee');
    // setFilterLike(filterLike);
    //  console.log(favourite, 'inside handlefavvvvv');
  };

  const Card = (data) => {
    //   console.log(data, 'filteredDatadddddd');
    return (
      <TouchableOpacity
        style={{width, marginBottom: 50}}
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate('Details', {item: data})}>
        <Image
          source={{uri: data.data.img}}
          style={{
            height: 180,
            //  backgroundColor: COLORS.light,
            width,
            marginHorizontal: 2,
            borderRadius: 10,
            marginBottom: 20,
            padding: 15,
            resizeMode: 'cover',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {data.data.name.length > 12 ? (
            <Text
              style={{fontSize: 17, fontFamily: 'Roboto-Bold', color: 'white'}}>
              {data.data.name.slice(0, 13)}...
            </Text>
          ) : (
            <Text
              style={{fontSize: 17, fontFamily: 'Roboto-Bold', color: 'white'}}>
              {data.data.name}
            </Text>
          )}

          <TouchableOpacity onPress={() => onHandleFavourite(data.data)}>
            <Icon name="heart" size={24} color={'#7b7b7b'} />
          </TouchableOpacity>
        </View>
        <Text
          style={{color: 'white', fontSize: 14, fontFamily: 'Roboto-Light'}}>
          {data.data.nickname}
        </Text>
      </TouchableOpacity>
    );
  };

  //console.log(data);
  const searchFilter = (search) => {
    if (search) {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = search.toUpperCase();
        //  console.log(itemData, itemData.indexOf(textData), 'checkingggg');
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(search);
    } else {
      setFilteredData(data);
      setSearch(search);
    }
  };
  const closehandle = () => {
    setSearch({search: ''});
    setIsSearch(false);

    console.log('closeee', search);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : isSearch ? (
        <View
          style={{
            flexDirection: 'row',

            backgroundColor: '#242424',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#7b7b7b'}
            value={search}
            underlineColorAndroid="transparent"
            style={{
              color: COLORS.light,

              fontSize: 26,
              paddingLeft: 20,
              width: 250,
              backgroundColor: '#242424',
            }}
            onChangeText={(search) => searchFilter(search)}
          />
          <TouchableOpacity
            onPress={() => closehandle()}
            style={{marginRight: 20, marginTop: 10}}>
            <Close name={'close'} size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 25,

              color: COLORS.light,
              fontFamily: 'Roboto-Bold',
            }}>
            The Breaking bad
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setIsSearch(true)}
              style={{marginRight: 10}}>
              <Icon name="search" size={24} color={COLORS.light} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ShowFavouriteList')}>
              <Image source={require('../assets/HEART_FILLED.png')} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {filteredData.length !== 0 ? (
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: isSearch ? 35 : 0,
            paddingHorizontal: 20,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={filteredData}
          renderItem={({item}) => {
            return <Card data={item} />;
          }}
        />
      ) : loading ? null : (
        <View style={{flex: 1, marginTop: 35, paddingHorizontal: 20}}>
          <Text style={{color: COLORS.green, fontSize: 25}}>
            No Character found!
          </Text>
          <Text
            style={{
              color: COLORS.light,
              fontSize: 22,
              fontFamily: 'Roboto-Medium',
            }}>
            Try again
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.grey,
    paddingVertical: 10,
  },
});
