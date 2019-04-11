import React from 'react';
import { Platform, Easing, Animated, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/SignIn'

export default createStackNavigator({
  SignIn: SignIn,Main: MainTabNavigator,

},
{
  headerMode: 'none',
  mode: 'card',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 600,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
  }),
})