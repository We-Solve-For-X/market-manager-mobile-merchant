import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title } from "@shoutem/ui"
//import Icon from '../icons/icons'
//  Config
import layout from '../../constants/layout'
import colors from '../../constants/colors'

export default HeaderScreen = ({title}) =>{
    return(
        <View style={styles.container}>
            <Title style={styles.text}>{title}</Title>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        backgroundColor: colors.pWhite,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 4
    },
    text: {
        color: colors.primary
    }
})
