import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import globalStyles from './global.styles';
import ArticlesScreen from './articles/ArticlesScreen';
import ArticleScreen from './articles/ArticleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView style={globalStyles.androidSafeArea}>
    //   <Articles/>
    // </SafeAreaView>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Articles" component={ArticlesScreen} options={{ title: 'Articles' }}/>
            <Stack.Screen name="Article" component={ArticleScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
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
