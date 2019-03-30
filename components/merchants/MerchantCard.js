import React from 'react';
import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native'
import {  Text, Icon, Button } from '@shoutem/ui'
import styleConsts from '../../constants/styleConsts'
import colors from '../../constants/colors';

export default class MerchentCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
          isExpanded: false,
          dummyIsActive: true
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, merchant, isApproved } = this.props
    const { isExpanded, dummyIsActive } = this.state
    const { id, hostId, authId, status, isActive, name, surname, email, cell, standName, businessName, standDescription} = merchant

    const { } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.topBox} onPress={() => this.setState({isExpanded: !isExpanded})}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
            <Text style={styles.textMain}>{standName}</Text>
            <Text style={styles.textSub}>{isActive ? 'ACTIVE' : 'INACTIVE'}</Text>
            <Text style={styles.textSubSub}>{name} {surname}</Text>
          </View>
          <TouchableOpacity style={{marginHorizontal: 7, flexDirection: 'column', justifyContent: 'center'}} onPress={() => navigation.navigate('MerchantsDetails')}>
            <Icon name="right-arrow" style={{color: colors.pWhite}}/>
          </TouchableOpacity>
        </TouchableOpacity>
        {!isExpanded ?
        null:
        (<View style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 4, backgroundColor: colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3}}>
          {/* <View style={styles.divider}/> */}
          {this._renderExpand(isApproved, dummyIsActive)}
        </View>)
        }
      </View>
    )
  }

  _renderExpand = (isApproved, isActive) => {
    if(isApproved){
      return(
        <View style={{width: '95%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <View style={styles.titleBox}>
              <Text style={styles.isActiveText}>Is Active: </Text>
            </View>
            <Switch
              onValueChange={this._toggleMerchant}
              value={isActive}
              style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
              trackColor={{false: colors.pRed, true: colors.pGreen}}
            />
        </View>
      )
    } else {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '95%'}}>
          <Button style={{marginHorizontal: 10, marginVertical: 8}}>
            <Icon name="checkbox-on" />
            <Text>ACCEPT</Text>
          </Button>

          <Button>
            <Icon name="clear-text" />
            <Text>REJECT</Text>
          </Button>
        </View>
      )
    }
  }

  _toggleMerchant = async () => {
    this.setState({dummyIsActive: !this.state.dummyIsActive})
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
      //paddingHorizontal: 4,
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
      padding: 7,
      //borderRadius: 3
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