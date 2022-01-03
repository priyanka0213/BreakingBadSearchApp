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
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect, useSelector, useDispatch} from 'react-redux';
import COLORS from '../consts/colors';
import Close from 'react-native-vector-icons/Ionicons';

import {favouriteAction} from '../store/actions';
const width = Dimensions.get('window').width / 2 - 30;
const ShowFavouriteList = (props) => {
  const [loading, setLoading] = useState(false);

  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.FavouriteReducer);
  useEffect(() => {
    console.log(favourite, 'datatatatata');
  }, []);

  const onHandleFavourite = (fav) => {
    setHeart(!heart);
    console.log(fav, 'handlefavvvvv');
    dispatch(favouriteAction(fav));
  };
  const Card = (data) => {
    //   console.log(data, 'filteredDatadddddd');
    return (
      <TouchableOpacity
        style={{width, marginBottom: 50}}
        activeOpacity={0.8}
        onPress={() => console.log('hii')}>
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
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              {data.data.name.slice(0, 13)}...
            </Text>
          ) : (
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              {data.data.name}
            </Text>
          )}
          <TouchableOpacity onPress={() => onHandleFavourite(data.data)}>
            {!heart ? (
              <Image source={require('../assets/HEART_FILLED.png')} />
            ) : (
              <Icon name="heart" size={24} color="#7b7b7b" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '800'}}>
          {data.data.nickname}
        </Text>
      </TouchableOpacity>
    );
  };

  console.log(favourite, 'Homee');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
      <View
        style={{
          // marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 60,
          paddingHorizontal: 20,
          backgroundColor: COLORS.grey,
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.green}}>
          Favourites
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Close name="close" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
          paddingHorizontal: 20,
        }}
        numColumns={2}
        data={favourite.actionLogs}
        renderItem={({item}) => {
          return <Card data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default ShowFavouriteList;
