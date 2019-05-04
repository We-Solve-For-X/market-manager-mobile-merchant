import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Text, TextInput } from '@shoutem/ui'
import colors from '../../constants/colors'


const LineInput = ({title, value, onChange, placeholder, secureTextEntry, maxLength = 22}) => {
    return(
      <View style={styles.lineContainer}>
        <View style={styles.titleBox}>
          <Text>{title}: </Text>
        </View>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChange}
          style={styles.lineInputText}
          maxLength={maxLength}
          value={value}
          secureTextEntry={secureTextEntry}
        />
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
    lineInputText: {
      flex: 1,
      paddingHorizontal: 5, 
      paddingVertical: 10, 
      justifyContent: 'flex-start', 
      height: 40,
      backgroundColor: colors.pGrey
    }
  });
  

  export default LineInput


