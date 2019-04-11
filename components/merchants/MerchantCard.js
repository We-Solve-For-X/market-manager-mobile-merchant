import React from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, ActivityIndicator } from 'react-native'
import {  Text, Icon, Button } from '@shoutem/ui'
import styleConsts from '../../constants/styleConsts'
import colors from '../../constants/colors'
import axios from'axios'
import { accept, reject, activate, deactivate } from "../../networking/nm_sfx_merchants";

export default class MerchentCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
          isExpanded: false,
          loading: false
        }
        this.signal = axios.CancelToken.source()
    }

  render() {
    const { navigation, merchant, isApproved } = this.props
    const { isExpanded, loading } = this.state
    const { id, hostId, authId, status, isActive, repName, repSurname, repEmail, repCell, name, legalName, description, category} = merchant

    const { } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.topBox} onPress={() => !isApproved ? this.setState({isExpanded: !isExpanded}) : navigation.navigate('MerchantsDetails', {id: id})}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
            <Text style={styles.textMain}>{name}</Text>
            <Text style={styles.textSub}>{isActive ? 'ACTIVE' : 'INACTIVE'}</Text>
            <Text style={styles.textSubSub}>{repName} {repSurname}</Text>
          </View>
          <TouchableOpacity style={{marginHorizontal: 7, flexDirection: 'column', justifyContent: 'center'}} onPress={() => navigation.navigate('MerchantsDetails', {id: id})}>
            <Icon name="right-arrow" style={{color: colors.pWhite}}/>
          </TouchableOpacity>
        </TouchableOpacity>
        {!isExpanded ?
        null:
        (<View style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 4, backgroundColor: colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3}}>
          {/* <View style={styles.divider}/> */}
          {this._renderExpand(isApproved, isActive, id)}
        </View>)
        }
      </View>
    )
  }

  _renderExpand = (isApproved, isActiveIn, id) => {
    if(isApproved){
      return(
        null
      )
    } else {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '95%'}}>
        {this.state.loading ? 
        (<ActivityIndicator/>) : 
        (<View style={{flexDirection: 'row'}}>
          <Button style={{marginHorizontal: 10, marginVertical: 8}} onPress={() => this._proccessApplication(id, true)}>
            <Icon name="checkbox-on" />
            <Text>ACCEPT</Text>
          </Button>
          <Button style={{marginHorizontal: 10, marginVertical: 8}} onPress={() => this._proccessApplication(id, false)}>
            <Icon name="clear-text" />
            <Text>REJECT</Text>
          </Button>
        </View>)}
        </View>
      )
    }
  }

  _proccessApplication = async (id = '', isAccept = true) => {
    this.setState({loading: true})
    const response = isAccept ? await accept(id, this.signal.token) : await reject(id, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        loading: false,
      }) 
      await this.props.reloadParent()
    } else {
      await this.setState({
        errorMessage: response.data,
        loading: false
      })
    }
  }

  // _acceptMerchant = async (id = '') => {
  //   console.log('accepting')
  //   this.setState({loading: true})
  //   const response = await accept(id, this.signal.token)
  //   //console.log(response)
  //   if (response.code == 200) {
  //     await this.props.reloadParent()
  //     this.setState({
  //       loading: false,
  //     }) 
  //   } else {
  //     this.setState({
  //       errorMessage: response.data,
  //       loading: false
  //     })
  //   }
  // }

  // _rejectMerchant = async (id = '') => {
  //   this.setState({loading: true})
  //   const response = await reject(id, this.signal.token)
  //   //console.log(response)
  //   if (response.code == 200) {
  //     this.setState({
  //       loading: false,
  //     }) 
  //     await this.props.reloadParent()
  //   } else {
  //     this.setState({
  //       errorMessage: response.data,
  //       loading: false
  //     })
  //   }
  // }

}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      //backgroundColor: colors.secondary,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 8,
      //paddingHorizontal: 4,
      //borderRadius: 3
    },
    topBox: {
      width: '100%',
      //height: 100,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //marginBottom: 8,
      padding: 7,
      borderRadius: 5
    },
    textMain: {
      ...styleConsts.textOne,
      color: colors.pWhite,
      paddingVertical: 3
    },
    textSub: {
      ...styleConsts.textTwo,
      color: colors.pWhite,
      paddingVertical: 2
    },
    textSubSub: {
      ...styleConsts.textThree,
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
  })


  /** Response:
   Merchant(hostId: String,
            authId: String,
            status: String, //﻿MerchStatus
            isActive: Boolean,
            repName: String,
            repSurname: String,
            repEmail: String,
            repCell: String,
            name: String,
            legalName: Option[String],
            description: String,
            category: Option[String],
            standId: Option[String],
            priceBracket: PriceBracket,
            createdAt: Option[OffsetDateTime] = Some(OffsetDateTime.now()),
            updatedAt: Option[OffsetDateTime] = Some(OffsetDateTime.now()),
            deleted: Boolean = false,
            id: Option[String] = Some(UUID.randomUUID().toString))
*/