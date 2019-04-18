import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, Icon, TextInput } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
//consts & comps
import { HostID } from "../config/env";
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
//API
import { sendMessage, loadSend } from "../networking/nm_sfx_communication"
import { sendMessageError, incompleteFields} from "../services/systemAlerts"

export default class CommunicationNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      toOptions: [],
      fromId: null, 
      fromName: null,
      sending: false,
      toSelected: null,
      topic: null,
      text: null
    }

    this.signal = axios.CancelToken.source()
  }
  

  componentDidMount = () => {
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    const { toOptions, toSelected, fromName, fromId, topic, text, sending, loading } = this.state
    return (
      <View style={styles.container}>
        <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>To: </Text>
            </View>
            <DropDownMenu
              options={toOptions}
              selectedOption={toSelected ? toSelected : toOptions[0]}
              onOptionSelected={(selected) => this.setState({ toSelected: selected })}
              titleProperty="description"
              visibleOptions={5}
              //style={{horizontalContainer: {backgroundColor: 'pink'}}}
            />
          </View>
          <View style={styles.divider}/>

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
              <Text>Topic: </Text>
            </View>
            <TextInput
              placeholder={'Message Topic'}
              onChangeText={(topic) => this.setState({topic})}
              style={styles.textInput}
              maxLength={28}
              value={topic}
            />
          </View>
          <View style={styles.divider}/>

          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button 
              style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder, width: 115}} 
              onPress={() => {sending || loading ? null : this._sendMessage(topic, text, fromId, fromName, toSelected)}}>
              <Text>SEND</Text>
              {(sending || loading) ? 
              <ActivityIndicator size="small" color={colors.pBlack} />
              : 
              <Ionicons name="ios-send" size={22} />
              }
            </Button>
          </View>
          
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput
            placeholder={'Compose message..'}
            style={{height: '100%', flexDirection: 'column', justifyContent: 'flex-start', width: '100%'}}
            onChangeText={(text) => this.setState({text})}
            multiline = {true}
            value={text}
          />
        </View>

        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _sendMessage = async (topic = '', text = '', fromId = '', fromName = '', toSelected = {recipientType: "ERROR", recipientId: '', description: ''}) => {
    this.setState({sending: true})
    if(topic == null || text == null || fromId == null || fromName == null || toSelected.recipientType == "ERROR" ) {
      incompleteFields()
      this.setState({sending: false})
      return
    }
    let message = {topic, text, fromId, fromName, recipientType: toSelected.recipientType, recipientId: toSelected.recipientId, description: toSelected.description}
    const response = await sendMessage(message, this.signal.token)
    if (response.code == 200) {
      this.setState({sending: false})
      this.props.navigation.goBack()
    } else {
      this.setState({sending: false})
      sendMessageError()
    }
    
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    //get name & surname
    //get uadministratorId
    const response = await loadSend(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        fromId: 'fromId', 
        fromName: 'Corlia Bredel',
        toOptions: response.data,
        toSelected: response.data[0],
        loading: false
      })
    } else {
      this.setState({
        errorMessage: response.data,
        loading: false
      })
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
    paddingHorizontal: 10
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
    paddingVertical: 0,
    width: '100%'
  },
  titleBox: {
    width: 50,
    marginLeft: 12
  }
});
