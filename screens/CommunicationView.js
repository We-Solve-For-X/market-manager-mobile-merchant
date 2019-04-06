import React from 'react';
import { View, StyleSheet } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, Icon, TextInput } from '@shoutem/ui'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { message1 } from "../networking/stubs";

export default class CommunicationView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fromName: '',
      toName: '',
      topic: '',
      text: '',
    }
  }

  componentDidMount = () => {
    //this._fetchData()
  }

  render() {
    const { navigation } = this.props
    const message = navigation.getParam('message', {none: 'none'});
    //const { topic, text, fromName, toName } = this.state
    const { topic, text, fromName, description } = message

    return (
      <View style={styles.container}>
        <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>
          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>From: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              defaultValue={fromName}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>To: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              defaultValue={description}
              editable={false}
            />
          </View>

          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Topic: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              defaultValue={topic}
              editable={false}
            />
          </View>

          <View style={styles.divider}/>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput
            style={{height: '100%', flexDirection: 'column', justifyContent: 'flex-start', width: '100%'}}
            value={text}
            multiline = {true}
            editable={false}
          />
        </View>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _fetchData = async () => {
    console.log("fetching data")
    const { id, topic, text, fromId, fromName, toType, toName, toId} = message1
    
    this.setState({
      fromName,
      toName,
      topic,
      text,
    })
    // this.setState({ loading: true })
    // const response = await fetchLocationDetails(spotId, this.signal.token)
    // if (response.code == 200) {
    //   this.setState({
    //     surfSpot: response.data.spot,
    //     meta: response.data.meta,
    //     loading: false
    //   }) 
    // } else {
    //   this.setState({
    //     errorMessage: response.data,
    //     loading: false
    //   })
    // }
  }

  static navigationOptions = {
    title: 'Links',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    paddingHorizontal: 8
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  divider: {
    width: '98%', 
    height: 1, 
    backgroundColor: colors.pBlack
  },
  textInput: {
    backgroundColor: 'transparent', 
    height: 42, 
    paddingVertical: 0
  },
  titleBox: {
    width: 50,
    marginLeft: 12
  }
});
