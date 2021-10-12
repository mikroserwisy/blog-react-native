import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ArticleScreen from './articles/ArticleScreen';
import ArticlesScreen from './articles/ArticlesScreen';
import {Ionicons} from '@expo/vector-icons'
import ProfileScreen from './profile/ProfileScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './redux';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const ArticlesStack = () => (
   <Stack.Navigator>
     <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} options={{ title: 'Articles' }}/>
     <Stack.Screen name="ArticleScreen" component={ArticleScreen}/>
   </Stack.Navigator>
);

const ProfileStack = () => (
   <Stack.Navigator>
     <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }}/>
   </Stack.Navigator>
);

const focusedColor = '#4775f2';
const defaultColor = '#b8bece'

const articlesTab = ({focused}) => (
  <Ionicons name='document' size={25} color={focused ? focusedColor : defaultColor}/>
);

const profileTab = ({focused}) => (
  <Ionicons name='person' size={25} color={focused ? focusedColor : defaultColor}/>
);

const tabNavigatorScreenOptions = {
  headerShown: false

};

export default (App) => {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
          <Tab.Navigator screenOptions={tabNavigatorScreenOptions}>
            <Tab.Screen name="ArticlesList" component={ArticlesStack} options={{tabBarIcon: articlesTab}}/>
            <Tab.Screen name="Profile" component={ProfileStack} options={{tabBarIcon: profileTab}}/>
          </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
