import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Icon, Title, Subtitle } from '@shoutem/ui'
import axios from 'axios'
import moment from 'moment'
import styleConsts from "../../constants/styleConsts"
import colors from '../../constants/colors'


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
    const { attendance } = this.props
    const { invoice, market } = attendance
    return (
      <TouchableOpacity style={styles.container} onPress={() => this._doNavigate()}>
        <View style={styles.topView}>
          <Title style={styles.topic} numberOfLines={1}>{market.name}</Title>
        </View>

        <View style={styles.midView}>
          <Subtitle style={styles.from} numberOfLines={1}>{moment(market.marketStart).format("dddd Do MMM YYYY")}</Subtitle>
          <Icon name="right-arrow" style={styles.arrow}/>
        </View>

        <View style={styles.botView}>
          <Text >
            <Text style={styles.desc}>{`Invoice ${invoice.refNum}: R${invoice.amount}`}</Text>
            <Text style={{fontSize: 13, fontWeight: 'bold', paddingVertical: 2, color: invoice.status == 'paid' ? colors.pGreen : invoice.status == 'submitted' ? colors.pBlue : colors.pRed}}>{` ${invoice.status}`}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  _doNavigate = () => {
    this.props.navigation.navigate('AttendanceDetails', {attendanceId: this.props.attendance.attendanceId})
  }

}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    //height: 100,
    backgroundColor: colors.secondary,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    padding: 8,
    borderRadius: 5
  },
  topView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%'
  },
  midView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    paddingVertical: 3
  },
  botView: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center', 
    width: '100%', 
    marginBottom: 4
  },
  arrow: {
    color: colors.pWhite
  },
  topic: {
    ...styleConsts.textOne,
    color: colors.pWhite
  },
  from: {
    ...styleConsts.textTwo,
    color: colors.pYellow
  }, 
  desc: {
    ...styleConsts.textThree,
    color: colors.pWhite
  }
});