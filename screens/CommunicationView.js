import React from 'react';
import { View, StyleSheet } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { TextInput } from '@shoutem/ui'
import colors from '../constants/colors'
import LineView from "../components/common/LineView"

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

  render() {
    const { navigation } = this.props
    const message = navigation.getParam('message', {none: 'none'});
    const { topic, text, fromName, description } = message

    return (
      <View style={styles.container}>

        <View style={styles.topFields}>
          <LineView title={'From'}            value={fromName}/>
          <View style={styles.divider}/>
          <LineView title={'To'}            value={description}/>
          <View style={styles.divider}/>
          <LineView title={'Topic'}            value={topic}/>
          <View style={styles.divider}/>
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
