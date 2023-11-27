import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Splash from './src/screen/splash';
import { reduxProvider } from './src/config/store';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Screens = new Map();

Screens.set('splash', Splash);

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(key,() => gestureHandlerRootHOC(reduxProvider(C)),() => C);
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'splash'
      }
    }
  })
})