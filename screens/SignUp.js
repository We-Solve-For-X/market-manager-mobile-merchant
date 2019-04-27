import React from 'react';
import { StyleSheet, View, ImageBackground, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import imagesRef from '../assets/imagesRef'
import { Button, } from "@shoutem/ui"
import { Text, Title, Heading } from "@shoutem/ui"
//import { TextInput } from "@shoutem/ui"
import { TextInput } from "react-native-paper"
import { connectStyle } from '@shoutem/theme'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
import ViewLoad from "../components/common/ViewLoad"
import ViewSwitch from "../components/common/ViewSwitch"
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { signinAdmin } from "../networking/nm_sfx_auth"
import { asSetProfile } from "../services/asyncStorage/asApi"
import { isTablet } from "../constants/platform"

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signingIn: false,
      errorMessage: null,
      email: '',
      standName: '',
      submitted: false
    }
    this.signal = axios.CancelToken.source()
  }

  // componentDidMount = () => {
  //   this._isLogedIn()
  // }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { signingIn, email, standName, errorMessage, submitted } = this.state

    return (
      <ImageBackground
      source={imagesRef.signInBG}
      imageStyle={{opacity: 1}}
      style={styles.container}
      resizeMode={'cover'}
      > 
      <KeyboardAvoidingView behavior="padding" style={styles.keybCont} >
          <View style={styles.subCont}>
            
            <View style={styles.headingCont}>
              <Text style={styles.subTitle}>Register Your Account</Text>
              <ViewSwitch hide={!submitted}>
                <Text style={styles.description}>Please enter a valid email address along with your stand/business name. You will receive a confirmation email with further steps shortly.</Text>
                <Button 
                  style={styles.button} 
                  onPress={() => this.props.navigation.navigate('SignIn')}>
                  <Text>BACK</Text>
                  <AntDesign name="back" size={22} />
                </Button>
              </ViewSwitch>
            </View>

            <ViewSwitch hide={submitted} style={styles.textInCont}>
              <TextInput
                theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white',underlineColor:'transparent',background : 'transparent'}}}
                mode={'flat'}
                underlineColor={'white'}
                selectionColor={'white'}
                label='Email (username)'
                placeholder={'please enter a valid email address'}
                value={email}
                maxLength={55}
                onChangeText={(email) => this.setState({email})}
              />
              <TextInput
                theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white',underlineColor:'transparent',background : 'transparent'}}}
                mode={'flat'}
                underlineColor={'white'}
                selectionColor={'white'}
                label='Stand Name'
                placeholder={'Your stand or business name'}
                value={standName}
                maxLength={17}
                secureTextEntry
                onChangeText={(standName) => this.setState({standName})}
              />
            </ViewSwitch>

            <Text style={styles.errorMesg}>{errorMessage}</Text>

            <ViewSwitch hide={submitted} style={styles.signInCont}>
              <Button 
                style={styles.button} 
                onPress={() => signingIn || submitted ? null : this._register()}>
                <Text>SUBMIT</Text>
                <ViewLoad hide={signingIn}>
                  <AntDesign name="adduser" size={22} />
                </ViewLoad>
              </Button>
              <Button 
                style={styles.button} 
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text>BACK</Text>
                <AntDesign name="back" size={22} />
              </Button>
            </ViewSwitch>
            
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }

  _register = async () => {
    this.setState({ signingIn: true, errorMessage: null })

    //const response = await signinAdmin(AuthIn, this.signal.token)
    // if (response.code == 200) {
    //   const res = await asSetProfile(response.data, AuthIn.username) 
    //   if(res == false){
    //     this.setState({
    //       signingIn: false,
    //       errorMessage: "Unable to save info to your device storage",
    //     }) 
    //     return
    //   }
    //   this.setState({ signingIn: false }) 
    //   this.props.navigation.navigate('Main');
    // } else {
    //   this.setState({
    //     errorMessage: response.data,
    //     signingIn: false
    //   })
    // }
    this.setState({submitted: true})
  }

  // _isLogedIn = async () => {
  //   console.log("checking is logged in")
  // }

  static navigationOptions = {
    title: 'SignUp',
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
  keybCont: {
    width: '100%', 
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  subCont: {
    width: '90%', 
    height: '94%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.pBlackTransp, 
    paddingHorizontal: '4%', 
    borderRadius: 5
  },
  signInCont: {
    flex: 3, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 10
  },
  headingCont: {
    flex: 3, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  logoMain: {
    color: colors.pWhite, 
    marginVertical: 20
  },
  title: {
    fontSize: isTablet ? 38 : 25, 
    color: colors.pWhite
  },
  subTitle: {
    fontSize: isTablet ? 30 : 20, 
    color: colors.pWhite
  },
  description: {
    fontSize: isTablet ? 24 : 14, 
    color: colors.pWhite
  },
  textInCont: {
    flex: 2, 
    flexDirection: 'column', 
    justifyContent: 'space-around'
  },
  button: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    ...styleConsts.buttonBorder, 
    width: 115
  },
  errorMesg: {
    fontSize: 15, 
    color: colors.pRed
  }
});


export default connectStyle('com.example.AvatarItem', styles)(SignUp)



