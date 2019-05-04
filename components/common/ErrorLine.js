import React from 'react'
import { StyleSheet } from "react-native"
import ViewSwitch from "../../components/common/ViewSwitch"
import { Text } from '@shoutem/ui'
import colors from "../../constants/colors"

const ErrorLine = ({errorMessage, style}) => { 
    return (
    <ViewSwitch style={style ? style : styles.container} hide={errorMessage == null}>
        <Text style={styles.errorText}>{errorMessage}</Text>
    </ViewSwitch>
)}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    errorText: {
      marginHorizontal: 17, 
      marginVertical: 8, 
      color: colors.pRed
    }
  })
  
export default ErrorLine