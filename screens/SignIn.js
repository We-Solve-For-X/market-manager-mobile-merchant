import React from 'react';
import { StyleSheet, View, ImageBackground, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Constants } from 'expo'
import imagesRef from '../assets/imagesRef'
import { Button, } from "@shoutem/ui"
import { Text, Icon, Heading } from "@shoutem/ui"
import { TextInput } from "@shoutem/ui"
import { connectStyle } from '@shoutem/theme'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { signinAdmin } from "../networking/nm_sfx_auth";
import { asSetProfile } from "../services/asyncStorage/asApi";

const appVersion = Constants.manifest.version

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signingIn: false,
      errorMessage: null,
      password: 'myword',
      email: 'merts.ms@gmail.com'
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._isLogedIn()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    //const styles = this.props.style
    const { signingIn, password, email, errorMessage } = this.state
    return (
      <ImageBackground
      source={imagesRef.signInBG}
      imageStyle={{opacity: 1}}
      style={styles.container}
      resizeMode={'cover'}
      > 
      {/* <NavigationEvents
        onDidFocus={() => {this.executeLanding()}}
      /> */}
      <KeyboardAvoidingView behavior="padding" style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
      
      <View style={{
        width: '70%', 
        height: '85%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.pBlackTransp, 
        paddingHorizontal: '4%', borderRadius: 5}}>
        
        <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={Platform.isPad ? {fontSize: 38, color: colors.pWhite} : {fontSize: 22, color: colors.pWhite}}>Irene Village Market</Text>
          <FontAwesome name="shopping-basket" size={Platform.isPad ? 50 : 30} style={{size: 50, color: colors.pWhite, marginVertical: 20}}/>
          <Text style={Platform.isPad ? {fontSize: 30, color: colors.pWhite} : {fontSize: 18, color: colors.pWhite}}>Market Manager</Text>
        </View>

        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-around'}}>
        <TextInput
          placeholder={'Email'}
          onChangeText={(email) => this.setState({email})}
          //style={styles.textInput}
          maxLength={40}
          value={email}
        />
        <TextInput
          placeholder={'Password'}
          onChangeText={(password) => this.setState({password})}
          //style={styles.textInput}
          maxLength={20}
          value={password}
          secureTextEntry
        />
        </View>

        <View style={{flex: 3, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10}}>
        <Button 
          style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder, width: 115}} 
          onPress={() => this._signInAsync()}>
          <Text>SIGN IN</Text>
          { signingIn ? 
          <ActivityIndicator size="small" color={colors.pBlack} />
          : 
          <AntDesign name="login" size={22} />
          }
        </Button>
        <Text style={{fontSize: 15, color: colors.pRed}}>{errorMessage}</Text>
        </View>

      </View>


        
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    this.setState({ signingIn: true, errorMessage: null })
    let AuthIn = {userType: 'Administrator', username: this.state.email, password: this.state.password}
    
    const response = await signinAdmin(AuthIn, this.signal.token)
    if (response.code == 200) {
      const res = await asSetProfile(response.data, AuthIn.username) 
      if(res == false){
        this.setState({
          signingIn: false,
          errorMessage: "Unable to save info to your device storage",
        }) 
        return
      }
      this.setState({ signingIn: false }) 
      this.props.navigation.navigate('Main');
    } else {
      this.setState({
        errorMessage: response.data,
        signingIn: false
      })
    }
  }

  _isLogedIn = async () => {
    console.log("checking is logged in")
  }

  static navigationOptions = {
    title: 'SignIn',
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: colors.pViewBg,
    opacity: 0.99
  },
});


export default connectStyle('com.example.AvatarItem', styles)(SignIn);



