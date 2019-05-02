import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Modal, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { isTablet } from "../constants/platform"
import { Text, Button, Title, Heading, Subtitle } from '@shoutem/ui'
import LineInput from "../components/common/LineInput"
import LineView from "../components/common/LineView"
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
import ErrorLine from "../components/common/ErrorLine"
import axios from 'axios'
import moment from 'moment'
//consts & comps
import { systemAlert } from "../services/systemAlerts"
import { asGet } from "../services/asyncStorage/asApi"
import { ProfileCnsts } from "../services/asyncStorage/asConsts"
import ViewSwitch from "../components/common/ViewSwitch"
import NoContent from "../components/common/NoContent"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env"
//API
import { fetch, submitPayment } from "../networking/nm_sfx_attendances"
import ViewLoad from '../components/common/ViewLoad'

export default class AttendanceDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      errorMessage: null,
      //fetchData
      market: {},
      invoice: {},
      confirmPayment: false,
      paymentComment: '',
      confirmPaymentLoad: false
    }

    this.signal = axios.CancelToken.source()
  }
  

  componentDidMount = () => {
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    let { loading, confirmPayment, confirmPaymentLoad, errorMessage, paymErrorMessage } = this.state
    let { attendanceId, market, invoice } = this.state
    let { name, description, unCode, setupStart, marketStart, marketEnd, takeNote } = market
    let { invoiceType, amount, refNum, status } = invoice

    return (
      <View style={styles.container}>
      <ScrollView 

        refreshControl={
          <RefreshControl
            refreshing={loading}
            enabled={false}
          />
        }
      >
      <ErrorLine errorMessage={errorMessage}/>

          {/* <View style={styles.divider}/> */}
          <View style={styles.addCont}>
            <Title style={styles.title}>Market Information</Title>
          </View>
          <LineView title={'Name'}          value={name}/>
          <View style={styles.divider}/>
          <LineView title={'Description'}    value={description}/>
          <View style={styles.divider}/>
          <LineView title={'Market Code'}    value={unCode ? `${unCode}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Setup Start'}    value={moment(setupStart).format("dddd Do MMM YYYY HH:mm")}/>
          <View style={styles.divider}/>
          <LineView title={'Market Start'}    value={moment(marketStart).format("dddd Do MMM YYYY HH:mm")}/>
          <View style={styles.divider}/>
          <LineView title={'Market End'}    value={moment(marketEnd).format("dddd Do MMM YYYY HH:mm")}/>
          <View style={styles.divider}/>
          <LineView title={'Take Note'}    value={takeNote}/>

          <View style={styles.addCont}>
            <Title style={styles.title}>Invoice</Title>
          </View>
          <LineView title={'Invoice Type'}     value={'Market Attendance'}/>
          <View style={styles.divider}/>
          <LineView title={'Amount Due'}      value={`R${amount}`}/>
          <View style={styles.divider}/>
          <LineView title={'Refference Number'}     value={refNum}/>
          <View style={styles.divider}/>
          <LineView title={'Payment Status'}    value={status}/>
          <View style={styles.divider}/>
          <ViewSwitch hide={!(status == 'submitted')} style={styles.lineContainer}>
              <Text>{'Your payment is being processed by your Market Administrator'}</Text>
          </ViewSwitch>
          <ViewSwitch hide={status == 'paid' || status == 'submitted'} style={styles.lineContainer}>
              <Text>{'After you have paid your invoice via EFT or bank deposit, selelct "submit payment" to request that the administrator verify the payment on their system.'}</Text>
          </ViewSwitch>
          <ErrorLine errorMessage={paymErrorMessage}/>
          <ViewSwitch hide={confirmPayment || status == 'paid' || status == 'submitted'}>
             <Button 
              style={styles.addButton} 
              onPress={ async () => this.setState({confirmPayment: true}) }
            >
              <Text>SUBMIT PAYMENT</Text>
              <MaterialIcons name="payment" size={22} />
            </Button>
          </ViewSwitch>
          
          <ViewSwitch hide={!confirmPayment}>
            <Button 
                style={styles.addButton} 
                onPress={ async () => {confirmPaymentLoad ? null : this._confirmPayment() }}
              >
                <Text>CONFIRM</Text>
                <ViewLoad hide={confirmPaymentLoad}>
                  <EvilIcons name="check" size={22} />
              </ViewLoad>
            </Button>
          </ViewSwitch>
          




        </ScrollView> 
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _confirmPayment = async () => {
    this.setState({confirmPaymentLoad: true})
    const { invoice } = this.state
    let invoiceId = invoice.id

    if(invoiceId == null) {
      systemAlert('Payment Error', 'Unable to retreive all fields required to make the payment')
      this.setState({ confirmPaymentLoad: false  })
    }

    const response = await submitPayment(invoiceId, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        paymErrorMessage: null,
        confirmPaymentLoad: false,
        confirmPayment: false
      }) 
      this._fetchData(true)
    } else {
      systemAlert('Payment Error', `There was an error processing the payment on our servers: ${response.data}`)
      this.setState({
        paymErrorMessage: response.data,
        confirmPaymentLoad: false,
        submitting: false
      })
    }
    // let response = await fetch(attendanceId, this.signal.token)
    // console.log(response)
    // if (response.code == 200) {
    //   let { market, invoice } = response.data
    //   await this.setState({
    //     market,
    //     invoice,
    //     loading: false
    //   }) 
    // } else {
    //   await this.setState({
    //     errorMessage: response.data,
    //     loading: false
    //   })
    // }
  }

  _fetchData = async (silent = false) => {
    silent ? null : this.setState({ loading: true })
    let attendanceId = this.props.navigation.getParam('attendanceId', '')
    let response = await fetch(attendanceId, this.signal.token)
    console.log(response)
    if (response.code == 200) {
      let { market, invoice } = response.data
      await this.setState({
        market,
        invoice,
        loading: false
      }) 
    } else {
      await this.setState({
        errorMessage: response.data,
        loading: false
      })
    }
  }

  static navigationOptions = {
    title: 'Links',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    //paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1, 
    padding: isTablet ? 80 : 16, 
    backgroundColor: colors.pBlackTransp, 
    flexDirection: 'column', 
    justifyContent: 'flex-start'
  },
  mdInner: {
    backgroundColor: colors.pGrey, 
    padding: 15, 
    width: '100%', 
    height: '100%'
  },
  mdHide: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  title: {
    color: colors.pWhite
  },
  subCont: {
    width: '100%', 
    flexDirection: 'column', 
    alignItems: 'flex-start'
  },  
  deleteCon: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  deleteCon2: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  addCont: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  button: { 
    //height: 28,
    paddingHorizontal: 7, 
    height: 38,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.secondary, 
    ...styleConsts.buttonBorder
  },
  lineContainer: {
    width: '100%', 
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row', 
    justifyContent: 'center', 
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
    width: '90%'
  },
  titleBox: {
    width: 95,
    marginLeft: 12
  },
  headingOne: {
    fontSize: isTablet ? 26 : 21,
    fontWeight: "bold",
  },
  addButton: {
    marginVertical: 18, 
    marginHorizontal: 45, 
    ...styleConsts.buttonBorder
  }
})