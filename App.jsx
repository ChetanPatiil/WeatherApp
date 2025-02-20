import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import ContactPage from './components/ContactPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


export default function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.26:5000/get-data');
        console.log(response.data); 
      } catch (error) {
        console.log('Request Error', error);
      }
    };      

    fetchData();
  }, []);
  

  const Tab = createBottomTabNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Contact' screenOptions={{headerTitleAlign: 'center', headerTintColor: 'black',  tabBarActiveTintColor: 'deepskyblue', tabBarInactiveTintColor: 'gray',}}>
        <Tab.Screen name='Weather' component={HomePage} options={{tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud" size={size} color={color} />), headerTitle: 'Weather Forcast', }} />
        <Tab.Screen name='News' component={NewsPage} options={{tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />), headerTitle: 'Weather News',}}/>
        <Tab.Screen name='Contact' component={ContactPage} options={{tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />), }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

// <NavigationContainer>
//       <StatusBar barStyle="light-content"  backgroundColor="deepskyblue"       />
//       <Drawer.Navigator screenOptions={{headerStyle:{backgroundColor:'deepskyblue',color:'white'},headerTintColor: 'white'}}>
//         <Drawer.Screen name='Home' component={HomePage} />
//         <Drawer.Screen name='About' component={AboutPage} />
//         <Drawer.Screen name='Contact' component={ContactPage} />
//       </Drawer.Navigator>
//     </NavigationContainer>