import React from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, ActivityIndicator } from 'react-native'
import {  Text, Icon, Button, TextInput } from '@shoutem/ui'
import axios from 'axios'
import styleConsts from "../../constants/styleConsts"
import colors from '../../constants/colors'
import { systemAlert } from "../../services/systemAlerts"
import ViewSwitch from "../../components/common/ViewSwitch"
import { Feather, MaterialCommunityIcons, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { removeAttendance, submitPayment } from "../../networking/nm_sfx_markets"

export default class AttendanceCard extends React.PureComponent {
  constructor(props) {
      super(props)
      this.state = {
        isExpanded: false,
        //remove attendance
        verifyRemove: false,
        removing: false,
        //payment
        paymentMethod: null,
        confirmPayment: false,
        amount: 0,
        paymentComment: '',
        submitting: false
      }
      
      this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    let amount = this.props.attendance.invoice ? this.props.attendance.invoice.amount : 0
    this.setState({amount})
  }

  render() {
    const { attendance, isCreate } = this.props
    const { isExpanded, removing} = this.state
    const { id, merchant, invoice} = attendance
    const { isActive, repName, repSurname, name, description, priceZone, standId } = merchant

    return (
      <View style={styles.container}>
        <View style={styles.topBox} onPress={() => this.setState({isExpanded: !isExpanded})}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
            <Text style={styles.textMain}>{name}</Text>
            <Text style={styles.textSub}>{repName} {repSurname}</Text>
            <Text style={styles.textSub}>{`Price Bracket: ${priceZone.name}`}</Text>

            <ViewSwitch hide={isCreate}>
              <View>
                <Text style={styles.textSub}>{`R${invoice ? invoice.amount : null} - ${invoice ? invoice.status : null}`}</Text>
                <Text style={styles.textSub}>{`Refference: ${invoice ? invoice.refNum : null}`}</Text>
              </View>
            </ViewSwitch>
            
          </View>

          <TouchableOpacity 
            style={{marginHorizontal: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%'}} 
            onPress={() => this.setState({isExpanded: !isExpanded})}>
            <View style={{height: '87%', width: 1, backgroundColor: colors.pWhite}}/>
            <MaterialCommunityIcons name="dots-horizontal" size={25} style={{color: colors.pWhite, marginHorizontal: 20}}/>
          </TouchableOpacity>
        </View>

        <ViewSwitch hide={!isExpanded} style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 4, backgroundColor: colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3}}>
          {this._renderExpand(isCreate, merchant.id, invoice ? invoice.status : null)}
        </ViewSwitch>
      </View>
    )
  }

  _renderExpand = (isCreate = false, merchId = '', invStatus = '') => {
    if(isCreate){
      return(
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '95%'}}>
          <View>
            <Button style={{marginVertical: 10, marginHorizontal: 15, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => this.props.removeAttendance(merchId)}>
              <Text>REMOVE</Text>
              <Ionicons name="md-remove" size={22} />
            </Button>
          </View>
        </View>
      )
    } else {
      return(
      <View>

        <ViewSwitch hide={invStatus == 'paid'}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
              <Button style={{marginVertical: 10, marginHorizontal: 5, ...styleConsts.buttonBorder, ...{backgroundColor: this.state.paymentMethod == 'card' ? colors.pGreen : colors.pWhite}}} onPress={() => this.setState({paymentMethod: 'card'})}>
                <Text>CARD</Text>
                <MaterialIcons name="payment" size={24} />
              </Button>
              <Button style={{marginVertical: 10, marginHorizontal: 5, ...styleConsts.buttonBorder, ...{backgroundColor: this.state.paymentMethod == 'cash' ? colors.pGreen : colors.pWhite}}} onPress={() => this.setState({paymentMethod: 'cash'})}>
                <Text>CASH</Text>
                <MaterialCommunityIcons name="cash" size={26} />
              </Button>
              <Button style={{marginVertical: 10, marginHorizontal: 5, borderColor: colors.secondary, ...styleConsts.buttonBorder, ...{backgroundColor: this.state.paymentMethod == 'eft' ? colors.pGreen : colors.pWhite}}} onPress={() => this.setState({paymentMethod: 'eft'})}>
                <Text>EFT</Text>
                <MaterialIcons name="computer" size={23} />
              </Button>
          </View>

          <ViewSwitch hide={this.state.paymentMethod == null}>
            <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}>
              <TextInput
                placeholder={'Amount'}
                onChangeText={(amount) => {this.setState({amount})}}
                defaultValue={`${this.state.amount}`}
                style={styles.textInput}
                maxLength={150}
                value={this.state.amount}
              />
              <TextInput
                placeholder={'Additional payment comment'}
                onChangeText={(paymentComment) => this.setState({paymentComment})}
                style={styles.textInput}
                maxLength={250}
                value={this.state.paymentComment}
              />
              <Button style={{marginVertical: 10, marginHorizontal: 5, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => this.state.submitting ? null : this._submitPayment()}>
                <Text>SUBMIT</Text>
                {this.state.submitting ? <ActivityIndicator/> : <AntDesign name="check" size={23} />}
              </Button>

            </View>
          </ViewSwitch>
            
        </ViewSwitch>

        <View style={{height: 1, width: '96%', backgroundColor: colors.pWhite}}/>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '99%'}}>
          { this.state.verifyRemove ? 
          (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button 
              style={{marginVertical: 5, marginHorizontal: 15, ...styleConsts.buttonBorder}} 
              onPress={() => this._removeAttendance()}>
              <Text>CONFIRM</Text>
              <AntDesign name="check" size={23} />
            </Button>
            <Button 
              style={{marginVertical: 5, marginHorizontal: 15, ...styleConsts.buttonBorder}} 
              onPress={() => this.setState({verifyRemove: false})}>
              <Text>CANCELL</Text>
              <AntDesign name="close" size={22} />
            </Button>
          </View>)
          : (
          <View>
            <Button 
              style={{marginVertical: 5, marginHorizontal: 15, borderColor: colors.secondary, backgroundColor: colors.pRed , ...styleConsts.buttonBorder}} 
              onPress={() => this.setState({verifyRemove: true})}>
              <Text>REMOVE</Text>
              {/* <Ionicons name="md-remove" size={22} /> */}
            </Button>
          </View>) }

        </View>

      </View>
      )
    }
  }

 
  _removeAttendance = async () => {
    this.setState({ removing: true })
    const idIn = this.props.attendance.id
    const response = await removeAttendance(idIn, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        removing: false,
        isExpanded: false
      })
      await this.props.updateParent()
    } else {
      await this.setState({
        errorMessage: response.data,
        removing: false
      })
    }
  }

  _submitPayment = async () => {
    this.setState({ submitting: true })
    const { merchant, invoice } = this.props.attendance
    let method = this.state.paymentMethod
    let comment = this.state.paymentComment
    let invoiceId = invoice.id
    let merchantId = merchant.id
    let amount = parseFloat(this.state.amount)
    let reference = invoice.refNum

    if(method == null || invoiceId == null || merchantId == null || reference == null) {
      systemAlert('Payment Error', 'Unable to retreive all fields required to make the payment')
      this.setState({ submitting: false  })
    } else if(amount == null) {
      systemAlert('Payment Error', 'The payment amount you entered was incorrect')
      this.setState({ submitting: false })
    }

    let payment = {
      invoiceId,
      merchantId,
      amount,
      reference,
      sourceRef: 'administartor app: [Name]',
      method,
      comment
    }
    const response = await submitPayment(payment, this.signal.token)
    if (response.code == 200) {
      this.props.updateParent()
      this.setState({
        submitting: false,
        isExpanded: false,
        confirmPayment: false
      }) 
      
    } else {
      systemAlert('Payment Error', `There was an error processing the payment on our servers: ${response.data}`)
      this.setState({
        errorMessage: response.data,
        submitting: false
      })
    }
  }

}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      //backgroundColor: colors.secondary,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 8,
      // paddingHorizontal: 4,
      // paddingVertical: 4,
      borderRadius: 3
    },
    topBox: {
      width: '100%',
      //height: 100,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //marginBottom: 8,
      paddingHorizontal: 7,
      paddingVertical: 7,
      //borderRadius: 3
    },
    textMain: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.pWhite,
      paddingVertical: 3
    },
    textSub: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.pWhite,
      paddingVertical: 2
    },
    divider: {
      width: '97%', 
      height: 0.5, 
      backgroundColor: colors.pWhite
    },
    titleBox: {
      width: 80,
      //marginLeft: 12
    },
    isActiveText: {
      fontSize: 15,
      color: colors.pWhite
    },
    textInput: {
      backgroundColor: 'transparent', 
      height: 42, 
      paddingVertical: 0,
      width: '50%'
    },
  })