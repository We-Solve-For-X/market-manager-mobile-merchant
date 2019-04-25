import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl} from 'react-native'
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
//API
import { overview, updateAdministrator, updatePriceZones } from "../networking/nm_sfx_home"
import { changePassword } from "../networking/nm_sfx_auth"
import ErrorLine from '../components/common/ErrorLine'
import { asClearProfile } from "../services/asyncStorage/asApi"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMessage: null,
      loadSignOut: false,
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
      merchantsTxt: '',

      priceB1_key: null,
      priceB1_name: null,
      priceB1_cost: null,
      priceB2_key: null,
      priceB2_name: null,
      priceB2_cost: null,
      priceB3_key: null,
      priceB3_name: null,
      priceB3_cost: null,
      priceB4_key: null,
      priceB4_name: null,
      priceB4_cost: null,
      pbLoading: false,
      pbErrorMessage: null

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
    const { host, marketsTxt, loadSignOut, paymentsTxt, merchantsTxt, userName, cPassw, nPassw, loadingPw, pwErrorMessage, loadingPatch, patchErrorMessage, loading, errorMessage } = this.state
    const { pName, pSurname, pEmail, pRole } = this.state
    const { pbLoading, pbErrorMessage, priceB1_key, priceB1_name, priceB1_cost, priceB2_key, priceB2_name, priceB2_cost, priceB3_key, priceB3_name, priceB3_cost, priceB4_key, priceB4_name, priceB4_cost } = this.state

    return (
      <View style={styles.container}>
      <ScrollView refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this._fetchData()}
            />
          } contentContainerStyle={styles.scrollContainer}>
          
        <ErrorLine errorMessage={errorMessage}/>

        <ViewSwitch style={styles.dataCardTop} hide={!pName}>
          <Heading>Hi, {pName}.</Heading>
          <Subtitle>Welcome to Irene Market Manager</Subtitle>
        </ViewSwitch>

        <View style={styles.dataCard}>
          <Heading>Payments</Heading>
          <Subtitle>{paymentsTxt}</Subtitle>
        </View>

        <View style={styles.dataCard}>
          <Heading>Merchants</Heading>
          <Subtitle>{merchantsTxt}</Subtitle>
        </View>

        <View style={styles.dataCard}>
          <Heading >Host Details</Heading>
          <Subtitle>Irene Market's Information:</Subtitle>
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
        </View>

        <View style={styles.dataCard}>
          <Heading>Bank Account Details</Heading>
          <Subtitle>Bank Account Into Which Merchants Should Make Their Payments:</Subtitle>
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
        </View>

        <View style={styles.dataCard}>
          <Heading>Price Zones</Heading>
          <Subtitle>Assignable Price Zone Descriptions and Cost:</Subtitle>
          <View style={styles.divider}/>
          <Subtitle> Price Zone A:</Subtitle>
          <LineInput title={'Description'}  value={priceB1_name} onChange={(priceB1_name) => this.setState({priceB1_name})}/>
          <LineInput title={'Cost'}         value={`${priceB1_cost}`} onChange={(priceB1_cost) => this.setState({priceB1_cost})}/>
          <View style={styles.divider}/>
          <Subtitle> Price Zone B:</Subtitle>
          <LineInput title={'Description'}  value={priceB2_name} onChange={(priceB2_name) => this.setState({priceB2_name})}/>
          <LineInput title={'Cost'}         value={`${priceB2_cost}`} onChange={(priceB2_cost) => this.setState({priceB2_cost})}/>
          <View style={styles.divider}/>
          <Subtitle> Price Zone C:</Subtitle>
          <LineInput title={'Description'}  value={priceB3_name} onChange={(priceB3_name) => this.setState({priceB3_name})}/>
          <LineInput title={'Cost'}         value={`${priceB3_cost}`} onChange={(priceB3_cost) => this.setState({priceB3_cost})}/>
          <View style={styles.divider}/>
          <Subtitle> Price Zone D:</Subtitle>
          <LineInput title={'Description'}  value={priceB4_name} onChange={(priceB4_name) => this.setState({priceB4_name})}/>
          <LineInput title={'Cost'}         value={`${priceB4_cost}`} onChange={(priceB4_cost) => this.setState({priceB4_cost})}/>
          <View style={styles.divider}/>
          <ViewSwitch hide={pbErrorMessage == null}>
              <Text style={styles.errorText}>{pbErrorMessage}</Text>
          </ViewSwitch>
          <View style={styles.buttonContainer}>
          <Button 
            style={styles.button} 
            onPress={() => pbLoading ? null : this._updatePriceBrackets()}>
            <Text>UPDATE</Text>
            <ViewLoad hide={pbLoading}>
              <AntDesign name="clouduploado" size={22} />
            </ViewLoad>
          </Button>   
          </View> 
        </View>

        <View style={styles.dataCard}>
          <Heading>Administrator Details</Heading>
          <Subtitle>Your User Profile Information:</Subtitle>
          <View style={styles.divider}/>
          <LineInput title={'Name'}     value={pName} onChange={(pName) => this.setState({pName})}/>
          <View style={styles.divider}/>
          <LineInput title={'Surname'}  value={pSurname} onChange={(pSurname) => this.setState({pSurname})}/>
          <View style={styles.divider}/>
          <LineInput title={'Email'}    value={pEmail} maxLength={50} onChange={(pEmail) => this.setState({pEmail})}/>
          <View style={styles.divider}/>
          <LineInput title={'Role'}     value={pRole} onChange={(pRole) => this.setState({pRole})}/>
          <View style={styles.divider}/>
          <ViewSwitch hide={pwErrorMessage == null}>
              <Text style={styles.errorText}>{patchErrorMessage}</Text>
          </ViewSwitch>
          <View style={styles.buttonContainer}>
          <Button 
            style={styles.button} 
            onPress={() => loadingPatch ? null : this._updateAdminst()}>
            <Text>UPDATE</Text>
            <ViewLoad hide={loadingPatch}>
              <AntDesign name="clouduploado" size={22} />
            </ViewLoad>
          </Button>   
          </View> 
        </View>

        <View style={styles.dataCard}>
          <Heading>Sign-In Credentials</Heading>
          <Subtitle>Change User Credentials:</Subtitle>
          <View style={styles.divider}/>
          <LineView title={'Username'}      value={userName} maxLength={50}/>
          <View style={styles.divider}/>
          <LineInput title={'Password'}     value={cPassw} onChange={(cPassw) => this.setState({cPassw})} secureTextEntry={true} placeholder={'...current password'}/>
          <View style={styles.divider}/>
          <LineInput title={'New Password'} value={nPassw} onChange={(nPassw) => this.setState({nPassw})} secureTextEntry={true} placeholder={'...new password'}/>
          <View style={styles.divider}/>
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
        </View>

        <View style={styles.dataCard}>
          <View style={styles.buttonContainer}>
          <Button 
            style={styles.button} 
            onPress={() => loadSignOut ? null : this._signOutAsync()}>
            <Text>Sign Out</Text>
            <ViewLoad hide={loadSignOut}>
              <AntDesign name="logout" size={22} />
            </ViewLoad>
          </Button> 
          </View>
        </View>

        </ScrollView>
      </View>
    )
  }

  _updatePriceBrackets = async () => {
    this.setState({ pbLoading: true })
    const { priceB1_name, priceB1_cost, priceB2_name, priceB2_cost, priceB3_name, priceB3_cost, priceB4_name, priceB4_cost } = this.state
    if(isNaN(parseFloat(priceB1_cost)) || isNaN(parseFloat(priceB2_cost)) || isNaN(parseFloat(priceB3_cost)) || isNaN(parseFloat(priceB4_cost))) {
      systemAlert('Invalid Amount', 'Please ensure all price zone costs are pure numericals')
      this.setState({pbLoading: false})
      return
    }
    else if(priceB1_name.length < 5 || priceB2_name.length < 5 || priceB3_name.length < 5 || priceB4_name.length < 5) {
      systemAlert('Description Error', 'Ensure that all price bracket have an adequate description')
      this.setState({pbLoading: false})
      return
    }

    let zoneA = {key: 'A', name: priceB1_name, cost: parseFloat(priceB1_cost)}
    let zoneB = {key: 'B', name: priceB2_name, cost: parseFloat(priceB2_cost)}
    let zoneC = {key: 'C', name: priceB3_name, cost: parseFloat(priceB3_cost)}
    let zoneD = {key: 'D', name: priceB4_name, cost: parseFloat(priceB4_cost)}

    let update = { zoneA, zoneB, zoneC, zoneD }
    let response = await updatePriceZones(HostID, update, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        pbLoading: false,
        pbErrorMessage: null,
        loading: false
      })
      await this._fetchData(true) 
    } else {
      await this.setState({
        pbErrorMessage: response.data,
        pbLoading: false
      })
    }
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
    await this.setState({ loadSignOut: false })
    this.props.navigation.navigate('SignIn')
  }

  _fetchData = async (silent = false) => {
    if(silent){ null } else { await this.setState({ loading: true }) }
    let adminId = this.state.administratorId
    let response = await overview(HostID, adminId, this.signal.token)
    if (response.code == 200) {
      let { host, profile } = response.data
      await this.setState({
        host:         host, 
        pName:        profile.name,
        pSurname:     profile.surname,
        pEmail:       profile.email,
        pRole:        profile.role, 
        marketsTxt:   response.data.marketsTxt, 
        paymentsTxt:  response.data.paymentsTxt, 
        merchantsTxt: response.data.merchantsTxt,

        priceB1_key: 'A',
        priceB1_name: host.priceBrackets.find(pz => pz.key === 'A').name,
        priceB1_cost: host.priceBrackets.find(pz => pz.key === 'A').cost,
        priceB2_key: 'B',
        priceB2_name: host.priceBrackets.find(pz => pz.key === 'B').name,
        priceB2_cost: host.priceBrackets.find(pz => pz.key === 'B').cost,
        priceB3_key: 'C',
        priceB3_name: host.priceBrackets.find(pz => pz.key === 'C').name,
        priceB3_cost: host.priceBrackets.find(pz => pz.key === 'C').cost,
        priceB4_key: 'D',
        priceB4_name: host.priceBrackets.find(pz => pz.key === 'D').name,
        priceB4_cost: host.priceBrackets.find(pz => pz.key === 'D').cost,
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
    backgroundColor: colors.pGrey, 
    ...styleConsts.viewShadow
  },
  dataCard: { 
    margin: 10, 
    padding: 5, 
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: colors.pWhite, 
    ...styleConsts.viewShadow
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
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  button: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    ...styleConsts.buttonBorder, width: 115
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
  titleBox: {
    width: 120,
    marginLeft: 5
  },
  lineViewText: {
    flex: 1,
    paddingHorizontal: 5, 
    paddingVertical: 10, 
    justifyContent: 'flex-start'
  },
  lineInputText: {
    flex: 1,
    paddingHorizontal: 5, 
    paddingVertical: 10, 
    justifyContent: 'flex-start', 
    height: 40
  }
});
