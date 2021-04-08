/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginApp from './src/components/Login'
import SignupComponent from './src/components/signUpcomponent'
import {Provider} from 'react-redux'
import store from './redux/store'
import LoginComponent from './src/components/LoginComponent'
import SearchData from './src/components/Searchdata'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>      
     
       <Stack.Screen name="SignUp" component={SignupComponent} />
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Screen1" component={SearchData}  
        options={
          {title: 'Second Screen'}}/>
     
    </Stack.Navigator>
  );
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
    
      <Provider store={store}>
      <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
