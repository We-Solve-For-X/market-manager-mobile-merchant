import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from '@shoutem/ui'
import colors from '../../constants/colors'

const LineView = ({title, value}) => {
    return(
      <View style={styles.lineContainer}>
        <View style={styles.titleBox}>
          <Text>{title}: </Text>
        </View>
        <View style={styles.lineViewText}>
          <Text>{value ? value : null}</Text>
        </View>
      </View>
    )
  }

const styles = StyleSheet.create({
    lineContainer: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'flex-start', 
      alignItems: 'center',
      backgroundColor: colors.pGrey
    },
    titleBox: {
      width: 120,
      marginLeft: 5
    },
    lineViewText: {
      flex: 1,
      paddingHorizontal: 5, 
      paddingVertical: 10, 
      justifyContent: 'flex-start'
    }
  });
  

export default LineView