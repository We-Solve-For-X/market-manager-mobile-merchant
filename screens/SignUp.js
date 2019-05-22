import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView } from 'react-native'
import imagesRef from '../assets/imagesRef'
import { Button, } from "@shoutem/ui"
import { Text } from "@shoutem/ui"
import { systemAlert } from "../services/systemAlerts"
import { TextInput } from "react-native-paper"
import { connectStyle } from '@shoutem/theme'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import ViewLoad from "../components/common/ViewLoad"
import ViewSwitch from "../components/common/ViewSwitch"
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { HostID } from '../config/env'
import { validateEmail } from "../services/validators"
import { signUpMerchant } from "../networking/nm_sfx_auth"
import { isTablet } from "../constants/platform"

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signingUp: false,
      errorMessage: null,
      username: '',
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
    const { signingUp, username, standName, errorMessage, submitted } = this.state

    return (
      <ImageBackground
      source={imagesRef.signInBG}
      imageStyle={{opacity: 1}}
      style={styles.container}
      resizeMode={'cover'}
      >     
      <View style={styles.subCont}>

        <KeyboardAvoidingView behavior="padding" style={styles.keybCont} >
          <View style={styles.headingCont}>
            <ViewSwitch  hide={submitted}>
              <Text style={styles.subTitle}>Register Your Account</Text>
              <Text style={styles.description}>Please enter a valid email address along with your stand/business name. You will shortly receive a confirmation email with further steps.</Text>
            </ViewSwitch>
            <ViewSwitch  hide={!submitted}>
              <Text style={styles.subTitle}>Success!</Text>
              <Text style={styles.description}>{`Signup successful. You will shortly receive a confirmation email with an one-time-pin (OTP) delivered to ${username}. Use this OTP to log in to your account.`}</Text>
            </ViewSwitch>
          </View>

          <ViewSwitch hide={submitted} style={styles.textInCont}>
            <TextInput
              theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white',underlineColor:'transparent',background : 'transparent'}}}
              mode={'flat'}
              underlineColor={'white'}
              selectionColor={'white'}
              label='Email (username)'
              //placeholder={'please enter a valid email address'}
              value={username}
              maxLength={55}
              onChangeText={(username) => this.setState({username})}
            />
            <TextInput
              theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white',underlineColor:'transparent',background : 'transparent'}}}
              mode={'flat'}
              underlineColor={'white'}
              selectionColor={'white'}
              label='Stand Name'
              //placeholder={'Your stand or business name'}
              value={standName}
              maxLength={17}
              onChangeText={(standName) => this.setState({standName})}
            />
          </ViewSwitch>
          </KeyboardAvoidingView>

          <View style={styles.buttonCont}>
          <Text style={styles.errorMesg}>{errorMessage}</Text>

          <ViewSwitch hide={submitted} style={styles.signInCont}>
            <Button 
              style={styles.button} 
              onPress={() => signingUp || submitted ? null : this._register()}>
              <Text>SUBMIT</Text>
              <ViewLoad hide={signingUp}>
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
          <ViewSwitch hide={!submitted} style={styles.signInCont}>
            <Button 
              style={styles.button} 
              onPress={() => {
                this.setState({submitted: false, signingUp: false})
                this.props.navigation.navigate('SignIn')
                }}>
              <Text>BACK</Text>
              <AntDesign name="back" size={22} />
            </Button>
          </ViewSwitch>
          </View>

        </View>
     
      </ImageBackground>
    )
  }

  _register = async () => {
    this.setState({ signingUp: true, errorMessage: null })
    let { username, standName } = this.state
    if(username.length < 4 ||  standName.length < 3) {
      systemAlert('Incomplete Info', 'Please complete both fields before submitting your profile.')
      this.setState({ signingUp: false  })
      return
    } else if (!validateEmail(username)) {
      systemAlert('Invalid Email', 'Please enter a valid email address.')
      this.setState({ signingUp: false  })
      return
    }

    let signUpPost = {
      userType: "Merchant",
      username: username,
      standName: standName,
      hostId: HostID
    }
    const response = await signUpMerchant(signUpPost, this.signal.token)
    if (response.code == 200) {
      this.setState({
        signingUp: false,
        submitted: true
      }) 
    } else {
      this.setState({
        errorMessage: response.data,
        signingUp: false
      })
    }

    this.setState({signingUp: false})
  }

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
  buttonCont: {
    height: 135
  },
  title: {
    fontSize: isTablet ? 38 : 25, 
    color: colors.pWhite
  },
  subTitle: {
    fontSize: isTablet ? 30 : 20, 
    marginBottom: isTablet ? 18 : 12, 
    color: colors.pWhite
  },
  description: {
    fontSize: isTablet ? 24 : 14, 
    color: colors.pWhite
  },
  textInCont: {
    width: '100%',
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



