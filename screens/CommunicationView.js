import React from 'react';
import { View, StyleSheet } from 'react-native'
import axios from 'axios'
import ButtonFloat from '../components/common/ButtonFloat'
import { TextInput, Button, Text } from '@shoutem/ui'
import colors from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LineView from "../components/common/LineView"
import ViewLoad from "../components/common/ViewLoad"
import { deleteMessage } from "../networking/nm_sfx_communication"
import { systemAlert } from "../services/systemAlerts"

export default class CommunicationView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fromName: '',
      toName: '',
      topic: '',
      text: '',
      deleting: false
    }
    this.signal = axios.CancelToken.source()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { deleting } = this.state
    const { navigation } = this.props
    const message = navigation.getParam('message', {none: 'none'});
    const { topic, text, fromName, description, id } = message

    return (
      <View style={styles.container}>

        <View style={styles.topFields}>
          <LineView title={'From'}            value={fromName}/>
          <View style={styles.divider}/>
          <LineView title={'To'}            value={description}/>
          <View style={styles.divider}/>
          <LineView title={'Topic'}            value={topic}/>
          <View style={styles.divider}/>
          {/* <View style={styles.buttonContainer}>
            <Button 
              style={styles.sendButton} 
              onPress={() => {deleting ? null : this._deleteMessage(id)}}>
              <Text>DELETE</Text>
              <ViewLoad hide={(deleting)}>
                <MaterialCommunityIcons name="delete-outline" size={22} />
              </ViewLoad>
            </Button>
          </View> */}
        </View>

        <View style={styles.messageContainer}>
          <TextInput
            style={styles.messageInput}
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
    const { topic, text, fromName, toName} = message1
    this.setState({
      fromName,
      toName,
      topic,
      text,
    })
  }

  _deleteMessage = async (id = '') => {
    this.setState({deleting: true})
    const response = await deleteMessage(id, this.signal.token)
    if (response.code == 200) {
      this.setState({deleting: false})
      this.props.navigation.goBack()
    } else {
      this.setState({deleting: false})
      systemAlert('Error', 'Unable to delete this message. Please inform support.')
    }
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
  topFields: {
    width: '100%', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  messageContainer: {
    flex: 1, 
    flexDirection: 'row'
  },
  messageInput: {
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    width: '100%'
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  buttonContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  sendButton: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    ...styleConsts.buttonBorder, width: 115
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
