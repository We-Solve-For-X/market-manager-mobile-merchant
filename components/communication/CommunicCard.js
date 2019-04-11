import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import { Title, Subtitle, Text, Icon } from '@shoutem/ui'
import moment from 'moment'
import colors from '../../constants/colors'
import styleConsts from '../../constants/styleConsts'

export default class CommunicCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, message } = this.props
    const { topic, text, fromName, toName, createdAt } = message
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('CommunicationView', {message: message})}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <Title style={styles.topic} numberOfLines={1}>{topic}</Title>
          <Text style={styles.time} numberOfLines={1}>{moment(createdAt).format("ddd Do MMM HH:mm")}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 3}}>
          <Subtitle style={styles.from} numberOfLines={1}>{fromName}</Subtitle>
          <Icon name="right-arrow" style={{color: colors.pWhite}}/>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginBottom: 4}}>
          <Text style={styles.desc} numberOfLines={2}>{text}</Text>
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
      padding: 8,
      borderRadius: 5
    },
    topic: {
      ...styleConsts.textOne,
      color: colors.pWhite
    },
    time: {
      ...styleConsts.textThree,
      color: colors.pWhite
    }, 
    from: {
      ...styleConsts.textTwo,
      color: colors.pWhite
    }, 
    desc: {
      ...styleConsts.textThree,
      color: colors.pWhite
    }
  });