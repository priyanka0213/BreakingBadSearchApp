import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/Feather';

import {connect, useSelector, useDispatch} from 'react-redux';

const DetailsScreen = (props) => {
  const dataStore = useSelector((state) => state.MovieDataReducer);

  function renderCharacter(item, index) {
    console.log(item, 'seee');
    var destinationStyle = {};

    if (index == 0) {
      destinationStyle = {marginLeft: 0};
    }

    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',

          //  marginBottom: 20,
          marginHorizontal: 8,
          ...destinationStyle,
        }}
        onPress={() => {}}>
        <Image
          source={{uri: item.img}}
          resizeMode="cover"
          style={{
            width: width * 0.28,
            height: 150,
            borderRadius: 15,
            backgroundColor: 'white',
          }}
        />

        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
          {item.nickname}
        </Text>
      </TouchableOpacity>
    );
  }
  const renderHeader = (props) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          paddingVertical: 10,
          //opacity: 0,
        }}>
        <TouchableOpacity onPress={() => props.goBack()}>
          <Icon name={'arrow-left'} size={25} color={'white'} />
        </TouchableOpacity>
        <Image source={require('../assets/HEART_FILLED.png')} />
      </View>
    );
  };
  const renderImageBackground = () => {
    return (
      <View style={{width: '100%'}}>
        <ImageBackground
          source={{uri: img}}
          style={{
            width: '100%',
            height: 400,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          resizeMode="cover">
          {renderHeader(props.navigation)}
          <Image
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              alignSelf: 'center',
            }}
            source={{uri: img}}
            resizeMode="center"
          />
          <Text
            style={{
              fontSize: 24,
              color: 'white',
              textAlign: 'center',
              paddingTop: 20,
            }}>
            {name}
          </Text>
          <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
            {nickname}
          </Text>
        </ImageBackground>
      </View>
    );
  };
  //   let {blacklistContacts} = props;
  let {
    portrayed,
    occupation,
    birthday,
    appearance,
    name,
    nickname,
    img,
  } = props.route.params.item.data;
  console.log(dataStore.actionLogs[0].length, 'datstorrerr');
  // console.log(props.route.params.item.data, 'itemmmmmmmmm');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {renderImageBackground()}
        <View
          style={{
            opacity: 0.9,
          }}>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Text style={{color: '#18CA75'}}>Potrayed</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'white'}}>{portrayed}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', marginRight: 10}}>
                  {birthday}
                </Text>
                <Icon size={24} name={'calendar'} color={'white'} />
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Text style={{color: '#18CA75'}}>Occupation</Text>
            {occupation.map((item) => (
              <View>
                <Text style={{color: 'white'}}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
            <Text style={{color: '#18CA75'}}>Appeared in</Text>
            <FlatList
              horizontal
              data={appearance}
              renderItem={({item, index}) => {
                var destinationStyle = {};

                if (index == 0) {
                  destinationStyle = {marginLeft: 0};
                }
                return (
                  <View
                    style={{
                      backgroundColor: '#242424',
                      //  padding: 30,
                      paddingHorizontal: 25,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      ...destinationStyle,
                    }}>
                    <Text style={{color: 'white'}}>Season {item}</Text>
                  </View>
                );
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                fontWeight: 'bold',
                marginTop: 30,
                marginBottom: 15,
              }}>
              Other characters
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dataStore.actionLogs[0]}
              //    keyExtractor={(item) => item.id.toString()}
              renderItem={({item, index}) => renderCharacter(item, index)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
