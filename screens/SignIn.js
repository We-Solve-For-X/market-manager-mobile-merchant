import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView } from 'react-native'
import imagesRef from '../assets/imagesRef'
import { Button, } from "@shoutem/ui"
import { Text, Title, Heading } from "@shoutem/ui"
//import { TextInput } from "@shoutem/ui"
import { TextInput } from "react-native-paper"
import { connectStyle } from '@shoutem/theme'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
import ViewLoad from "../components/common/ViewLoad"
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { systemAlert } from "../services/systemAlerts"
import { validateEmail } from "../services/validators"
import { signinMerchant } from "../networking/nm_sfx_auth"
import { asSetProfile } from "../services/asyncStorage/asApi"
import { isTablet } from "../constants/platform"

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signingIn: false,
      errorMessage: null,
      password: '',
      email: ''
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
    const { signingIn, password, email, errorMessage } = this.state

    return (
      <ImageBackground
      source={imagesRef.signInBG}
      imageStyle={{opacity: 1}}
      style={styles.container}
      resizeMode={'cover'}
      > 
      <View style={styles.subCont}>

        <KeyboardAvoidingView behavior="padding" style={styles.keybCont} keyboardVerticalOffset={20}>
          
            <View style={styles.headingCont}>
              <Text style={styles.title}>Market Manager</Text>
              <FontAwesome name="shopping-basket" size={50} style={styles.logoMain}/>
              <Text style={styles.subTitle}>Irene Village Market</Text>
            </View>

            <View style={styles.textInCont}>
              <TextInput
                theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white',underlineColor:'transparent',background : 'transparent'}}}
                mode={'flat'}
                underlineColor={'white'}
                selectionColor={'white'}
                label='Username'
                value={email}
                maxLength={55}
                onChangeText={(email) => this.setState({email})}
              />
              <TextInput
                theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white',underlineColor:'transparent',background : 'transparent'}}}
                mode={'flat'}
                underlineColor={'white'}
                selectionColor={'white'}
                label='Password'
                value={password}
                maxLength={17}
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
              />
            </View>
            </KeyboardAvoidingView>

            <View style={styles.buttonCont}>      
              <Text style={styles.errorMesg}>{errorMessage}</Text>
              <View style={styles.signInCont}>
                <Button 
                  style={styles.button} 
                  onPress={() => signingIn ? null : this._signInAsync()}>
                  <Text>LOG IN</Text>
                  <ViewLoad hide={signingIn}>
                    <AntDesign name="login" size={22} />
                  </ViewLoad>
                </Button>
                <Button 
                  style={styles.buttonB} 
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text>REGISTER</Text>
                  {/* <AntDesign name="adduser" size={22} /> */}
                </Button>
                </View>
            </View>

          </View>
      </ImageBackground>
    )
  }

  _signInAsync = async () => {
    this.setState({ signingIn: true, errorMessage: null })
    let { email, password } = this.state
    if(email.length < 2 ||  password.length < 2) {
      systemAlert('Incomplete Info', 'Please complete both fields before submitting your profile.')
      this.setState({ signingIn: false  })
      return
    } else if (!validateEmail(email)) {
      systemAlert('Invalid Email', 'Please enter a valid email address.')
      this.setState({ signingIn: false  })
      return
    }

    let AuthIn = {userType: 'Merchant', username: email, password: password}
    const response = await signinMerchant(AuthIn, this.signal.token) 

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

  // _isLogedIn = async () => {
  //   console.log("checking is logged in")
  // }

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
  subCont: {
    width: '90%', 
    height: '94%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.pBlackTransp, 
    paddingHorizontal: '4%', 
    borderRadius: 5
  },
  keybCont: {
    flex: 1,
    width: '100%', 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingBottom: 5
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
  textInCont: {
    flex: 2, 
    width: '100%',
    flexDirection: 'column', 
    justifyContent: 'space-around'
  },
  buttonCont: {
    height: 135
  },
  button: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    width: 115
  },
  buttonB: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    backgroundColor: colors.secondary,
    width: 97
  },
  errorMesg: {
    fontSize: 15, 
    color: colors.pRed
  }
});


export default connectStyle('com.example.AvatarItem', styles)(SignIn);



