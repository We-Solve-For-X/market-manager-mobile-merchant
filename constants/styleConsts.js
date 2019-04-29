import { StyleSheet } from 'react-native'
import colors from '../constants/colors'
import { isTablet } from "../constants/platform"

export default styleConsts = StyleSheet.create({
    buttonBorder: {
        borderColor: colors.pBlack,
        borderWidth: 0.5
    },
    button: { 
        //height: 28,
        paddingLeft: 7,
        paddingRight: 7, 
        height: 38,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.pBlack,
        borderWidth: 0.5,
        marginHorizontal: 3
    },
    viewShadow:{
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1}, 
        shadowRadius: 5, 
        shadowOpacity: 0.3
    },
    headingOne: {
        fontSize: isTablet ? 26 : 21,
        fontWeight: "bold",
    },
    textOne: {
        fontSize: isTablet ? 20 : 17,
        fontWeight: "bold",
    },
    textTwo: {
        fontSize: isTablet ? 17 : 13,
        fontWeight: "normal",
    },
    textThree: {
        fontSize: isTablet ? 14 : 11,
        fontWeight: "normal",
    }
  })
  