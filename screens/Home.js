import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { Text, Heading, Subtitle, Title, TextInput, Button } from '@shoutem/ui'
import { isTablet } from "../constants/platform"
import axios from 'axios'
//consts & comps
import ViewLoad from "../components/common/ViewLoad"
import ViewSwitch from "../components/common/ViewSwitch"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts' 
import AntDesign from '@expo/vector-icons/AntDesign'
import { HostID } from "../config/env"
import { asGet } from "../services/asyncStorage/asApi"
import { ProfileCnsts } from "../services/asyncStorage/asConsts"
import { systemAlert } from "../services/systemAlerts"
import LineInput from "../components/common/LineInput"
import LineView from "../components/common/LineView"
import Updater from "../components/common/Updater"
//API
import { merchOverview, updateMerchant } from "../networking/nm_sfx_home"
import { changePassword } from "../networking/nm_sfx_auth"
import ErrorLine from '../components/common/ErrorLine'
import { asClearProfile } from "../services/asyncStorage/asApi"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      merchId: '',
      host: {},
      profile: {}, 
      messagesTxt: '',
      paymentsTxt: '',
      loading: false,
      errorMessage: null,

      //updater fields
      name: null,
      legalName: null,
      description: null,
      category: null,
      repName: null,
      repSurname: null,
      repEmail: null,
      repCell: null,
      //signout
      loadSignOut: false,
      shouldRefresh: false,

      loadingPatch: false,
      patchErrorMessage: null,

      loadingPw: false,
      pwErrorMessage: null,
      userName: '',
      cPassw: null,
      nPassw: null,
      updating: false
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = async () => {
    let merchId = await asGet(ProfileCnsts.id)
    let userName = await asGet(ProfileCnsts.username)
    await this.setState({merchId, userName})
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { host, profile, messagesTxt, paymentsTxt } = this.state
    const { loadSignOut, loadingPatch, patchErrorMessage, loading, errorMessage, shouldRefresh } = this.state
    //password
    const { userName, cPassw, nPassw, loadingPw, pwErrorMessage } = this.state
    //updater fields
    const { name, legalName, description, category, repName, repSurname, repEmail, repCell } = this.state
    return (
    <View style={styles.container}>
    <Updater shouldRefresh={shouldRefresh} onRefresh={() => this._updateScreen()} doneRefresh={() => this.setState({shouldRefresh: false, loading: false})} /> 
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={120}>
      <ScrollView
       contentContainerStyle={styles.scrollContainer}>
       {loading ? <ActivityIndicator/> : null}
        <ErrorLine errorMessage={errorMessage}/>

        <ViewSwitch style={styles.dataCardTop} hide={!profile.repName}>
          <Heading style={styles.topHeadTxt}>Hi, {profile.repName}.</Heading>
          <Subtitle style={styles.topSubTxt}>Welcome to Irene Market Manager</Subtitle>
        </ViewSwitch>

        <ViewSwitch style={styles.dataCard} hide={!paymentsTxt}>
          <Heading style={styleConsts.headingOne}>Payments</Heading>
          <Subtitle>{paymentsTxt}</Subtitle>
        </ViewSwitch>

        <ViewSwitch style={styles.dataCard} hide={!messagesTxt}>
          <Heading style={styleConsts.headingOne}>Messages</Heading>
          <Subtitle>{messagesTxt}</Subtitle>
        </ViewSwitch>

        <ViewSwitch style={styles.dataCard} hide={!profile.name}>
          <Heading style={styleConsts.headingOne} >Your Host Market's Details</Heading>
          <Subtitle>Irene Market Information:</Subtitle>
          <View style={styles.divider}/>
          <LineView title={'Name'}            value={host.name}/>
          <View style={styles.divider}/>
          <LineView title={'Contact Name'}    value={host.contactName}/>
          <View style={styles.divider}/>
          <LineView title={'Contact Number'}  value={host.contactNumber}/>
          <View style={styles.divider}/>
          <LineView title={'Email'}           value={host.email}/>
          <View style={styles.divider}/>
          <LineView title={'Website'}         value={host.website}/>
          <View style={styles.divider}/>
          <LineView title={'Address'}         value={host.address ? `${host.address.streetAddress}\n${host.address.city}\n${host.address.state}\n${host.address.zipCode}` : null}/>
        </ViewSwitch> 

        <ViewSwitch style={styles.dataCard} hide={!profile.name}>
          <Heading style={styleConsts.headingOne}>Host Bank Account</Heading>
          <Subtitle>Bank Account Into Which Payments Must Be Made:</Subtitle>
          <View style={styles.divider}/>
          <LineView title={'Bank'}          value={host.bankAccount ? `${host.bankAccount.bankName}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Holder'}        value={host.bankAccount ? `${host.bankAccount.accountHolder}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Type'}          value={host.bankAccount ? `${host.bankAccount.accountType}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Number'}        value={host.bankAccount ? `${host.bankAccount.accountNumber}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Branch Name'}   value={host.bankAccount ? `${host.bankAccount.branchName}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Branch Code'}   value={host.bankAccount ? `${host.bankAccount.branchCode}` : null}/>
        </ViewSwitch>

        <ViewSwitch style={styles.dataCard} hide={!profile.name}>
          <Heading style={styleConsts.headingOne}>Merchant Meta Data</Heading>
          <Subtitle>Merchant Status Information:</Subtitle>
          <LineView title={'Status'}      value={profile.status}/>
          <View style={styles.divider}/>
          <LineView title={'Is-Active'}   value={profile.isActive ? 'ACTIVE' : 'INACTIVE'}/>
          <View style={styles.divider}/>
          <LineView title={'Price Zone'}   value={profile.priceZone ? profile.priceZone.name : null}/>
          <View style={styles.divider}/>
          <LineView title={'Stand ID'}    value={profile.standId ? profile.standId : '(no stand-ID assigned)'}/>
        </ViewSwitch>

        <ViewSwitch style={styles.dataCardDark} hide={!profile.name}>
          <Heading style={styleConsts.headingOne}>Merchant Details</Heading>
          <Subtitle>Your Business and User Profile Information:</Subtitle>
          {/* <View style={styles.divider}/> */}
          <LineInput title={'Name'}        value={name} onChange={(name) => this.setState({name})}/>
          <View style={styles.divider}/>
          <LineInput title={'Legal Name'}  value={legalName} maxLength={100} onChange={(legalName) => this.setState({legalName})}/>
          <View style={styles.divider}/>
          <LineInput title={'Description'} value={description} maxLength={150} onChange={(description) => this.setState({description})}/>
          <View style={styles.divider}/>
          <LineInput title={'Category'}    value={category} onChange={(category) => this.setState({category})}/>
          <View style={styles.divider}/>
          <LineInput title={'Rep Name'}    value={repName} onChange={(repName) => this.setState({repName})}/>
          <View style={styles.divider}/>
          <LineInput title={'Rep Surname'} value={repSurname} maxLength={30} onChange={(repSurname) => this.setState({repSurname})}/>
          <View style={styles.divider}/>
          <LineInput title={'Email'}       value={repEmail} maxLength={80} onChange={(repEmail) => this.setState({repEmail})}/>
          <View style={styles.divider}/>
          <LineInput title={'Cell'}        value={repCell} maxLength={12} onChange={(repCell) => this.setState({repCell})}/>
          {/* <View style={styles.divider}/> */}
          <ViewSwitch hide={pwErrorMessage == null}>
              <Text style={styles.errorText}>{patchErrorMessage}</Text>
          </ViewSwitch>
          <View style={styles.buttonContainer}>
          <Button 
            style={styles.button} 
            onPress={() => loadingPatch ? null : this._updateMerch()}>
            <Text>UPDATE</Text>
            <ViewLoad hide={loadingPatch}>
              <AntDesign name="clouduploado" size={22} />
            </ViewLoad>
          </Button>   
          </View> 
        </ViewSwitch>

        <ViewSwitch style={styles.dataCardDark} hide={!profile.name}>
          <Heading style={styleConsts.headingOne}>Sign-In Credentials</Heading>
          <Subtitle>Change User Credentials:</Subtitle>
          {/* <View style={styles.divider}/> */}
          <LineView title={'Username'}      value={userName} maxLength={50}/>
          <View style={styles.divider}/>
          <LineInput title={'Password'}     value={cPassw} onChange={(cPassw) => this.setState({cPassw})} secureTextEntry={true} placeholder={'...current password'}/>
          <View style={styles.divider}/>
          <LineInput title={'New Password'} value={nPassw} onChange={(nPassw) => this.setState({nPassw})} secureTextEntry={true} placeholder={'...new password'}/>
          {/* <View style={styles.divider}/> */}
          <ViewSwitch hide={pwErrorMessage == null}>
              <Text style={styles.errorText}>{pwErrorMessage}</Text>
          </ViewSwitch>
          <View style={styles.buttonContainer}>
          <Button 
            style={styles.button} 
            onPress={() => loadingPw ? null : this._changePassword()}>
            <Text>UPDATE</Text>
            <ViewLoad hide={loadingPw}>
              <AntDesign name="clouduploado" size={22} />
            </ViewLoad>
          </Button>   
          </View> 
        </ViewSwitch>

        <View style={styles.dataCardDark}>
          <View style={styles.buttonContainer}>
          <Button 
            style={styles.button} 
            onPress={() => loadSignOut ? null : this._signOutAsync()}>
            <Text>SIGN OUT</Text>
            <ViewLoad hide={loadSignOut}>
              <AntDesign name="logout" size={22} />
            </ViewLoad>
          </Button> 
          </View>
        </View>

        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }


  _updateMerch = async () => {
    this.setState({ loadingPatch: true })
    const { name, legalName, description, category, repName, repSurname, repEmail, repCell } = this.state
    if(name == null || description == null || category == null || repName == null || repSurname == null || repEmail == null || repCell == null) {
      systemAlert('Content Required', 'All the fields are not populated, unable to update')
      this.setState({loadingPatch: false})
      return
    }
    else if(name.length < 4 || description.length < 4 || repEmail.length < 5 || repName.length == 0) {
      systemAlert('Password Error', 'All the fields are not populated, unable to update')
      this.setState({loadingPatch: false})
      return
    }
    let merchId = this.state.merchId
    let update = { name, legalName, description, category, repName, repSurname, repEmail, repCell }
    let response = await updateMerchant(update, merchId, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        loadingPatch: false,
        patchErrorMessage: null,
        loading: false
      })
      await this._fetchData(true) 
    } else {
      await this.setState({
        patchErrorMessage: response.data,
        loadingPatch: false,
        loading: false
      })
    }
  }

  _changePassword = async () => {
    this.setState({ loadingPw: true })
    let { userName, cPassw, nPassw } = this.state
    if(cPassw == null || nPassw == null) {
      systemAlert('Content Required', 'Please enter your current password and new password before submitting changes')
      this.setState({loadingPw: false})
      return
    }
    else if(nPassw.length < 6) {
      systemAlert('Password Error', 'Please choose a password consisting of at least 6 characters')
      this.setState({loadingPw: false})
      return
    }
    let update = { username: userName, cPassword: cPassw, nPassword: nPassw }
    let response = await changePassword(update, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        loadingPw: false,
        cPassw: null,
        nPassw: null,
        pwErrorMessage: null
      }) 
    } else {
      await this.setState({
        pwErrorMessage: response.data,
        loadingPw: false
      })
    }
  }

  _signOutAsync = async () => {
    await this.setState({ loadSignOut: true })
    await asClearProfile()
    await this.setState({ loadSignOut: false, shouldRefresh: true })
    this.props.navigation.navigate('SignIn')
  }

  _updateScreen = async () => {
    let merchId = await asGet(ProfileCnsts.id)
    let userName = await asGet(ProfileCnsts.username)
    await this.setState({merchId, userName})
    await this._fetchData(true)
  }

  _fetchData = async (silent = false) => {
    if(silent){ null } else { await this.setState({ loading: true }) }
    let merchId = await asGet(ProfileCnsts.id)
    let response = await merchOverview(merchId, this.signal.token)
    if (response.code == 200) {
      let { host, profile, paymentsTxt, messagesTxt } = response.data
      let { name, legalName, description, category, repName, repSurname, repCell, repEmail } = profile
      await this.setState({
        host:         host, 
        profile:      profile, 
        messagesTxt:  messagesTxt,
        paymentsTxt:  paymentsTxt,
        //updater fields
        name, 
        legalName, 
        description, 
        category, 
        repName, 
        repSurname, 
        repCell,
        repEmail,
        //error handling fields
        loading:      false,
        errorMessage: null
      }) 
    } else {
      await this.setState({
        errorMessage: response.data,
        loading: false
      })
    }
  }

  static navigationOptions = {
    title: 'Home',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    //padding: 10
  },
  dataCardTop: { 
    flexDirection: 'column', 
    alignItems: 'center', 
    margin: 10, 
    padding: 5, 
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: colors.secondary, 
    ...styleConsts.viewShadow
  },
  topHeadTxt: {
    color: colors.pWhite
  },
  topSubTxt: {
    color: colors.pYellow
  },
  dataCard: {
    margin: 10, 
    padding: 5, 
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: colors.pWhite, 
    ...styleConsts.viewShadow
  },
  dataCardDark: { 
    margin: 10, 
    padding: 5, 
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: colors.secondaryLight, 
    ...styleConsts.viewShadow
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  button: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    ...styleConsts.buttonBorder, 
    width: 115
  },
  errorText: {
    marginHorizontal: 17, 
    marginVertical: 8, 
    color: colors.pRed
  },
  divider: {
    width: '98%', 
    height: 1, 
    backgroundColor: colors.pBlack
  },
  textInput: {
    backgroundColor: 'transparent', 
    height: 42, 
    paddingVertical: 0,
    width: '100%'
  },
});
