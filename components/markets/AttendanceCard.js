import React from 'react';
import { StyleSheet, View, Button } from 'react-native'
import {  Text, Icon } from '@shoutem/ui'

import colors from '../../constants/colors';

export default class AttendanceCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, market } = this.props
    console.log(market)
    const { } = this.state
    return (
      <View style={styles.container}>
        <Button title="Attendance Card" onPress={() => console.log('should expand')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      height: 100,
      backgroundColor: colors.secondary,
      //flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4
    },
  });