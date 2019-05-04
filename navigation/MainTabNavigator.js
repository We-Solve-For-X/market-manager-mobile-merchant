import React from 'react'
import { Easing, Animated, Text } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator, TransitionConfig } from 'react-navigation'
import colors from '../constants/colors'
import { isTablet } from "../constants/platform"
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import Home from '../screens/Home'
import Attendances from '../screens/Attendances'
import AttendanceDetails from '../screens/AttendanceDetails'
import Communication from '../screens/Communication'
import CommunicationView from '../screens/CommunicationView'
import HeaderScreen from '../components/common/HeaderScreen'

const HomeStack = createStackNavigator({
  Home: Home,
})
HomeStack.navigationOptions = {
  tabBarLabel:"Home Page",
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="home-outline" size={22} color={colors.pWhite}/>
  )
}

const AttendancesStack = createStackNavigator({
  Attendances: Attendances,
})
AttendancesStack.navigationOptions = {
  tabBarLabel: 'Attendances',
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="shoppingcart" size={22} color={colors.pWhite}/>
  )
}

const CommunicationStack = createStackNavigator({
  Communication: Communication,
})
CommunicationStack.navigationOptions = {
  tabBarLabel: 'Communication',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="mail-outline" size={22} color={colors.pWhite}/>
  )
}

const PrimaryNavConfig = {
  initialRouteName: 'HomeStack',
  lazy: 'true',
  tabBarOptions:{
    showIcon: true,
    showLabel: false,
    indicatorStyle:{
        backgroundColor: colors.pGrey
    },
    style:{
        backgroundColor: colors.primary
    }
  }
  
}
const MainTabNav = createMaterialTopTabNavigator({
  HomeStack,
  AttendancesStack,
  CommunicationStack
}, PrimaryNavConfig)


const stackNavConfig = {
  //initialRouteName: 'CommunicationView',
  headerMode: 'screen',
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 450,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
  }),
}
const MainStack = createStackNavigator({
  MainTabNav: {
    screen: MainTabNav,
    navigationOptions: () => ({
      title: `Irene Market Manager`,
      header: (<HeaderScreen title={'Market Manager'}/>),
      headerBackTitle: null
    }),
  },
  AttendanceDetails: {
    screen: AttendanceDetails,
    navigationOptions: () => ({
      title: `Attendance Details`,
      header: (<HeaderScreen title={'Attendance Details'}/>),
      headerBackTitle: null
    }),
  },
  CommunicationView: {
    screen: CommunicationView,
    navigationOptions: () => ({
      title: `View Message`,
      header: (<HeaderScreen title={'View Message'}/>),
      headerBackTitle: null
    }),
  },
}, stackNavConfig)

export default MainStack