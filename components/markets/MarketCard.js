import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import { Title, Subtitle, Text, Icon } from '@shoutem/ui'
import moment from 'moment'
import colors from '../../constants/colors'
import styleConsts from '../../constants/styleConsts'

export default class MarketCard extends React.PureComponent {
  constructor(props) {
      super(props)
      this.state = {
          loading: true
      }
      //this.signal = axios.CancelToken.source()
  }

  render() {
    const { navigation, market } = this.props
    const { id, unCode, hostId, name, description, takeNote, setupStart, marketStart, marketEnd, standPrice } = market

    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('MarketDetails')} >
      
      <View style={{borderRadius: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: colors.primary, padding: 8}}>
        <View >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Title style={styles.date} numberOfLines={1}>{moment(marketStart).format("dddd Do MMM YYYY")}</Title>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.time} numberOfLines={1}>{name}</Text>
              <Icon name="right-arrow" style={{color: colors.pWhite}}/>
            </View> */}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginBottom: 4, marginTop: 5}}>
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
          </View>
        </View>
        <Icon name="right-arrow" style={{color: colors.pWhite}}/>
      </View>

      
        

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginBottom: 3}}>
          <Text style={styles.desc} numberOfLines={1}>{'Attendances: 163'}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Text style={styles.desc} numberOfLines={1}>{'Paid: '}</Text>
          <Text style={styles.paidY} numberOfLines={1}>{'121 '}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Text style={styles.desc} numberOfLines={1}>{'Awaitng: '}</Text>
          <Text style={styles.paidA} numberOfLines={1}>{'20'}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Text style={styles.desc} numberOfLines={1}>{'Outstanding: '}</Text>
          <Text style={styles.paidN} numberOfLines={1}>{'22'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      //height: 100,
      backgroundColor: colors.cardBg,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
      // paddingHorizontal: 8,
      // paddingVertical: 5,
      borderRadius: 3
    },
    date: {
      ...styleConsts.textOne,
      color: colors.pWhite
    }, 
    name: {
      ...styleConsts.textThree,
      color: colors.pWhite
    }, 
    paidY: {
      ...styleConsts.textTwo,
      color: colors.pGreen
    },
    paidA: {
      ...styleConsts.textTwo,
      color: colors.pYellow
    }, 
    paidN: {
      ...styleConsts.textTwo,
      color: colors.pRed
    }, 
    desc: {
      ...styleConsts.textTwo,
      color: colors.pWhite,
      marginVertical: 2,
      marginLeft: 10
    },
    divider: {
      width: '99%', 
      height: 0.5, 
      backgroundColor: colors.pWhite,
      marginVertical: 4
    },
  });