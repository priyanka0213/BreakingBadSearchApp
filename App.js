import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import HomeScreen from './src/screens/HomeScreen';
import DetailsSceeen from './src/screens/DetailsScreen';
import {StatusBar} from 'react-native';
import COLORS from './src/consts/colors';
import {Provider} from 'react-redux';
import ConfigureStore from './src/store/ConfigureStore';
import ShowFavouriteList from './src/screens/ShowFavouriteList';
const store = ConfigureStore();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          // translucent={true}
          backgroundColor={COLORS.grey}
        />
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsSceeen} />
          <Stack.Screen
            name="ShowFavouriteList"
            component={ShowFavouriteList}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
