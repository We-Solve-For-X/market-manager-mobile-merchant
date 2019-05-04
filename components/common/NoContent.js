import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from "@shoutem/ui"
//  Config
import layout from '../../constants/layout'
import colors from '../../constants/colors'

export default NoContent = ({refresh = false}) =>{
    return(
        <View style={styles.container}>
            <Text style={styles.textH}>No Content Available</Text>
            {refresh ? <Text style={styles.textD}>Pull to Refresh</Text> : null}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        backgroundColor: colors.pGrey,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },
    textH: {
        color: colors.primary,
        fontSize: 22
    },
    textD: {
        color: colors.primary,
        fontSize: 12
    }
})
