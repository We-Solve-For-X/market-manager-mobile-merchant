import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '@shoutem/ui'
//import Icon from '../icons/icons'
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
        height: 50,
        width: 50,
        borderRadius: 25,
        bottom: 40,
        right: 20,
        backgroundColor: colors.pBlack,
        //borderWidth: StyleSheet.hairlineWidth,

    }
})
