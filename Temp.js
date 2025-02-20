import 'react-native-gesture-handler';  // <-- THIS MUST BE THE VERY FIRST IMPORT
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import Ionicons for the tab icons
import { createStackNavigator } from '@react-navigation/stack';

enableScreens();

import HomePage from './components/HomePage';
import AboutPage from './components/NewsPage';

import ContactPage from './components/ContactPage';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="About" component={AboutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (<>
    <NavigationContainer>

      <Tab.Navigator
        initialRouteName="Home1"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#FF6347' },  // Tab bar background color
          tabBarIndicatorStyle: { backgroundColor: '#fff' },  // Active tab indicator color
          tabBarActiveTintColor: '#fff',  // Active tab label color
          tabBarInactiveTintColor: '#ccc',  // Inactive tab label color
          tabBarIndicatorStyle: {
            backgroundColor: 'green',  // Remove the indicator color
          },
          tabBarPressColor: 'transparent',  // Remove the ripple effect
          tabBarPressOpacity: 1,  // Remove opacity effect
        }}
      >
        <Tab.Screen
          name="Home1"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size}  />  // Home icon
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-circle" color={color} size={size} />  // About icon
            ),
          }}
        />
        <Tab.Screen
          name="Contact"
          component={ContactPage}
          options={{
            tabBarIcon: ({  size }) => (
              <Ionicons name="call" color={'white'} size={size} />  // Contact icon
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  </>
  );
};

export default App;
