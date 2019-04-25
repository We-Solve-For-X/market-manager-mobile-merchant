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
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('MarketDetails', {id: id})} >
      
      <View style={styles.inContainer}>
        <View >
          <View style={styles.dateText}>
            <Title style={styles.date} numberOfLines={1}>{moment(marketStart).format("dddd Do MMM YYYY")}</Title>
          </View>
          <View style={styles.subText}>
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
          </View>
          <View style={styles.codeView}>
            <Text style={styles.code} numberOfLines={2}>{unCode}</Text>
          </View>
        </View>
        <Icon name="right-arrow" style={{color: colors.pWhite}}/>
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      //height: 100,
      backgroundColor: colors.primary,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
      // paddingHorizontal: 8,
      // paddingVertical: 5,
      borderRadius: 5
    },
    inContainer: {
      borderRadius: 3, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%', 
      backgroundColor: colors.secondary, 
      padding: 8
    },
    dateText: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%'
    },
    subText: {
      flexDirection: 'row', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      width: '100%', 
      marginBottom: 4, 
      marginTop: 5
    },
    codeView: {
      flexDirection: 'row', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      width: '100%', 
      marginBottom: 4, 
      marginTop: 1
    },
    date: {
      ...styleConsts.textOne,
      color: colors.pWhite
    }, 
    name: {
      ...styleConsts.textTwo,
      color: colors.pWhite
    }, 
    code: {
      ...styleConsts.textThree,
      color: colors.pYellow
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