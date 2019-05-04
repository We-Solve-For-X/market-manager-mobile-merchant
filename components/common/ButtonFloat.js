import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '@shoutem/ui'
import { isTablet } from "../../constants/platform"
//  Config
import layout from '../../constants/layout'
import colors from '../../constants/colors'

export default ButtonFloat = ({navigation}) =>{
    return(
        <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
            <Icon name={"back"} style={{color: colors.pWhite}} />
            {/* <Text>Go Back</Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: isTablet ?  50 : 38,
        width: isTablet ?  50 : 38,
        borderRadius: isTablet ?  25 : 19,
        bottom: isTablet ?  40 : 20,
        right: isTablet ?  20 : 20,
        backgroundColor: colors.pBlack,
        //borderWidth: StyleSheet.hairlineWidth,

    }
})
