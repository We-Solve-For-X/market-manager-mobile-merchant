import React from 'react';
import { Easing, Animated } from 'react-native'
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

export default createSwitchNavigator({
  SignIn: SignIn,
  Main: MainTabNavigator,
  SignUp: SignUp,
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