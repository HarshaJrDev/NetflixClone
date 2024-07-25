import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screen/SplashScreen';
import HomeScreen from './screen/HomeScreen';
import SearchScreen from './screen/SearchScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabBNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }
          return <IonIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: 'gray',
        tabBarInactiveBackgroundColor: 'white',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabBNavigation} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
