import React from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator  } from 'react-native'
import {  Text, Icon, Button, TextInput } from '@shoutem/ui'
import { isTablet } from "../../constants/platform";
import styleConsts from "../../constants/styleConsts";
import colors from '../../constants/colors';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { HostID } from "../../config/env"
//API
import { addMerchant } from "../../networking/nm_sfx_markets"
import ViewSwitch from '../common/ViewSwitch';
import ViewLoad from '../common/ViewLoad';
import AntDesign from '@expo/vector-icons/AntDesign';

export default class AttendanceAddCard extends React.PureComponent {
  constructor(props) {
      super(props)
      this.state = {
        isExpanded: false,
        adding: false
      }
      this.signal = axios.CancelToken.source()
  }

  render() {
    const { navigation, attendance } = this.props
    const { isExpanded, adding } = this.state
    const { id, standId, merchant, invoice} = attendance

    return (
      <View style={styles.container}>
        <View style={styles.topBox} onPress={() => this.setState({isExpanded: !isExpanded})}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
            <Text style={styles.textMain}>{merchant.name}</Text>
            <Text style={styles.textSub}>{merchant.repName} {merchant.repSurname}</Text>
            <Text style={styles.textSub}>{merchant.priceZone.name}</Text>
            <Text style={styles.textSub}>{merchant.isActive ? 'ACTIVE' : 'INACTIVE'}</Text>
          </View>

          <TouchableOpacity 
            style={styles.addView} 
            onPress={() => this.setState({isExpanded: !isExpanded})}>
            <View style={{height: '87%', width: 1, backgroundColor: colors.pWhite}}/>
            <AntDesign name="adduser" size={25} style={{color: colors.pWhite, marginHorizontal: 20}}/>
          </TouchableOpacity>

        </View>
        {!isExpanded ?
        null:
        (<View style={styles.renExpView}>
          {/* <View style={styles.divider}/> */}
          {this._renderExpand()}
        </View>)
        }
      </View>
    )
  }

  _renderExpand = () => {
    return(
      <View style={styles.rendExpCont}>
          <Button style={styleConsts.button} onPress={() => this._addMerchant()}>
            <ViewSwitch hide={!isTablet}>
              <Text>ADD</Text>
            </ViewSwitch>
            <ViewLoad hide={this.state.sending}>
              <Icon name="plus-button" />
            </ViewLoad>
          </Button>
      </View>
    )
  }

  _addMerchant = async () => {
    let marketId = this.props.marketId
    let merchantId = this.props.attendance.merchant.id
    this.setState({ adding: true })
    console.log(marketId, merchantId)
    const response = await addMerchant(marketId, merchantId)
    if (response.code == 200) {
      //if (true) {
      this.setState({
        adding: false
      }) 
      this.props.removeNewAttendance(merchantId)
    } else {
      this.setState({
        errorMessage: response.data,
        adding: false
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
    renExpView: {
      width: '100%', 
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      paddingVertical: 4, 
      backgroundColor: colors.primary, 
      borderBottomLeftRadius: 3, 
      borderBottomRightRadius: 3
    },
    rendExpCont: {
      flexDirection: 'row', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      width: '95%'
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
    addView: {
      marginHorizontal: 7, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      height: '100%'
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