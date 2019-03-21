import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from "@shoutem/ui"
//import Icon from '../icons/icons'
//  Config
import layout from '../../constants/layout'
import colors from '../../constants/colors'

export default class SearchBar extends React.PureComponent {
  render() {
    const { placeholder, onChangeText, value } = this.props
    return (
        <TextInput
        placeholder={placeholder}
        style={styles.container}
        onChangeText={onChangeText}
        maxLength={28}
        value={value}
    />
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary, 
        borderRadius: 30, 
        margin: 10, height: 15
    },
})
