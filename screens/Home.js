import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import { Text, Heading, Subtitle, Title, TextInput, Button } from '@shoutem/ui'
import axios from 'axios'
//consts & comps
import ViewLoad from "../components/common/ViewLoad"
import ViewSwitch from "../components/common/ViewSwitch"
import colors from '../constants/colors'
import layout from '../constants/layout'
import styleConsts from '../constants/styleConsts' 
import AntDesign from '@expo/vector-icons/AntDesign'
import { HostID } from "../config/env"
import { asGet } from "../services/asyncStorage/asApi"
import { ProfileCnsts } from "../services/asyncStorage/asConsts"
import { systemAlert } from "../services/systemAlerts"
//API
import { overview, updateAdministrator } from "../networking/nm_sfx_home"
import { changePassword } from "../networking/nm_sfx_auth"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loadingPw: false,
      pwErrorMessage: null,
      loadingPatch: false,
      patchErrorMessage: null,
      administratorId: '',
      userName: '',
      cPassw: null,
      nPassw: null,
      updating: false,
      host: {},
      pName: null,
      pSurname: null,
      pEmail: null,
      pRole: null,
      marketsTxt: '',
      paymentsTxt: '',
      merchantsTxt: ''
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = async () => {
    let administratorId = await asGet(ProfileCnsts.adminstId)
    let userName = await asGet(ProfileCnsts.username)
    await this.setState({administratorId, userName})
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    const { updating, host, marketsTxt, paymentsTxt, merchantsTxt, userName, cPassw, nPassw, loadingPw, pwErrorMessage, loadingPatch, patchErrorMessage } = this.state
    const { pName, pSurname, pEmail, pRole } = this.state

    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pGrey, ...styleConsts.viewShadow}}>
          <Title>Hi, {pName}!</Title>
          <Subtitle>Welcome to Irene Market Manager</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Markets</Heading>
          <Subtitle>{marketsTxt}</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Payments</Heading>
          <Subtitle>{paymentsTxt}</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Merchants</Heading>
          <Subtitle>{merchantsTxt}</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Host Details</Heading>
          <Subtitle>The following is Irene Market's Host Information:</Subtitle>

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
          <LineView title={'Address'}         value={host.address ? `${host.address.streetAddress} ${host.address.city}, ${host.address.state} - ${host.address.zipCode}` : null}/>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Bank Account Details</Heading>
          <LineView title={'Bank'}    value={host.bankAccount ? `${host.bankAccount.bankName}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Holder'}    value={host.bankAccount ? `${host.bankAccount.accountHolder}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Type'}    value={host.bankAccount ? `${host.bankAccount.accountType}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Number'}    value={host.bankAccount ? `${host.bankAccount.accountNumber}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Branch Name'}    value={host.bankAccount ? `${host.bankAccount.branchName}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Branch Code'}    value={host.bankAccount ? `${host.bankAccount.branchCode}` : null}/>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Price Brackets</Heading>
          <Subtitle>The following shows the price brackets that are available for your merchants:</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Administrator Details</Heading>
          <Subtitle>The following is your personal Profile Information:</Subtitle>

          <LineInput title={'Name'} value={pName} onChange={(pName) => this.setState({pName})}/>
          <View style={styles.divider}/>
          <LineInput title={'Surname'} value={pSurname} onChange={(pSurname) => this.setState({pSurname})}/>
          <View style={styles.divider}/>
          <LineInput title={'Email'} value={pEmail} onChange={(pEmail) => this.setState({pEmail})}/>
          <View style={styles.divider}/>
          <LineInput title={'Role'} value={pRole} onChange={(pRole) => this.setState({pRole})}/>
          <View style={styles.divider}/>
          <ViewSwitch hide={pwErrorMessage == null}>
              <Text style={{marginHorizontal: 17, marginVertical: 8, color: colors.pRed}}>{patchErrorMessage}</Text>
          </ViewSwitch>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button 
            style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder, width: 115}} 
            onPress={() => loadingPatch ? null : this._updateAdminst()}>
            <Text>UPDATE</Text>
            <ViewLoad hide={loadingPatch}>
              <AntDesign name="clouduploado" size={22} />
            </ViewLoad>
          </Button>   
          </View> 
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Sign-In Credentials</Heading>
          <Subtitle>Change your sign-in credentials:</Subtitle>
          <LineView title={'Username'} value={userName} />
          <View style={styles.divider}/>
          <LineInput title={'Password'} value={cPassw} onChange={(cPassw) => this.setState({cPassw})} secureTextEntry={true} placeholder={'...current password'}/>
          <View style={styles.divider}/>
          <LineInput title={'New Password'} value={nPassw} onChange={(nPassw) => this.setState({nPassw})} secureTextEntry={true} placeholder={'...new password'}/>
          <View style={styles.divider}/>
          <ViewSwitch hide={pwErrorMessage == null}>
              <Text style={{marginHorizontal: 17, marginVertical: 8, color: colors.pRed}}>{pwErrorMessage}</Text>
          </ViewSwitch>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button 
            style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder, width: 115}} 
            onPress={() => loadingPw ? null : this._changePassword()}>
            <Text>UPDATE</Text>
            <ViewLoad hide={loadingPw}>
              <AntDesign name="clouduploado" size={22} />
            </ViewLoad>
            
          </Button>   
          </View> 
        </View>


        </ScrollView>
      </View>
    )
  }

  _updateAdminst = async () => {
    this.setState({ loadingPatch: true })
    let { pName, pSurname, pEmail, pRole } = this.state
    if(pName == null || pSurname == null || pEmail == null || pRole == null) {
      systemAlert('Content Required', 'All the fields are not populated, unable to update')
      this.setState({loadingPatch: false})
      return
    }
    else if(pName.length == 0 || pSurname.length == 0 || pEmail.length == 0 || pRole.length == 0) {
      systemAlert('Password Error', 'All the fields are not populated, unable to update')
      this.setState({loadingPatch: false})
      return
    }
    let adminId = this.state.administratorId
    let update = { name: pName, surname: pSurname, email: pEmail, role: pRole }
    let response = await updateAdministrator(update, adminId, this.signal.token)
    console.log(response)
    if (response.code == 200) {
      await this.setState({
        loadingPatch: false,
        patchErrorMessage: null
      }) 
      await this._fetchData()
    } else {
      this.setState({
        patchErrorMessage: response.data,
        loadingPatch: false
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
    console.log(response)
    if (response.code == 200) {
      this.setState({
        loadingPw: false,
        cPassw: null,
        nPassw: null,
        pwErrorMessage: null
      }) 
    } else {
      this.setState({
        pwErrorMessage: response.data,
        loadingPw: false
      })
    }
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    let adminId = this.state.administratorId
    let response = await overview(HostID, adminId, this.signal.token)
    console.log(response)
    if (response.code == 200) {
      let { host, profile } = response.data
      this.setState({
        host:         host, 
        pName:        profile.name,
        pSurname:     profile.surname,
        pEmail:       profile.email,
        pRole:        profile.role, 
        marketsTxt:   response.data.marketsTxt, 
        paymentsTxt:  response.data.paymentsTxt, 
        merchantsTxt: response.data.merchantsTxt,
        loading:      false
      }) 
    } else {
      this.setState({
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

const LineView = ({title, value}) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.titleBox}>
        <Text>{title}: </Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={value}
        editable={false}
      />
    </View>
  )
}

const LineInput = ({title, value, onChange, placeholder, secureTextEntry}) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.titleBox}>
        <Text>{title}: </Text>
      </View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        style={styles.textInput}
        //maxLength={28}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    //padding: 10
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
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
  titleBox: {
    width: 120,
    marginLeft: 12
  }
});
