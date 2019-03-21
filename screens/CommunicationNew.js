import React from 'react';
import { View, StyleSheet } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, Icon, TextInput } from '@shoutem/ui'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API

export default class CommunicationNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toOptions: [
        {
          date: "All Merchants",
        },
        {
          date: "Market: 01 April",
        },
        {
          date: "Market: 08 April",
        },
        {
          date: "Market: 15 April",
        },
        {
          date: "Market: 22 April",
        },
        {
          date: "Market: 29 April",
        },
      ],
      toSelected: null,
      fromUser: 'Corlia De Beer',
      topic: '',
      body: ''
    }
  }
  

  componentDidMount = () => {
    this._fetchData()
  }

  // componentWillUnmount() {
  //   this.signal.cancel('API request canceled due to componentUnmount')
  // }

  render() {
    const { navigation } = this.props
    const { toOptions, toSelected, fromUser, topic, body } = this.state
    return (
      <View style={styles.container}>
        <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>
          <View style={styles.lineContainer}>
            <View style={{marginRight: 21}}>
              <Text>To: </Text>
            </View>
            <DropDownMenu
              //styleName="horizontal"
              options={toOptions}
              selectedOption={toSelected ? toSelected : toOptions[0]}
              onOptionSelected={(selected) => this.setState({ toSelected: selected })}
              titleProperty="date"
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={{marginRight: 0}}>
              <Text>From: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              defaultValue={fromUser}
              editable={false}
              //onChangeText={...}
            />
          </View>

          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={{marginRight: 0}}>
              <Text>Topic: </Text>
            </View>
            <TextInput
              placeholder={'Message Topic'}
              onChangeText={(topic) => this.setState({topic})}
              style={styles.textInput}
              maxLength={28}
              value={topic}
              //onChangeText={...}
            />
          </View>

          <View style={styles.divider}/>

          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>

          

          <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this._sendMessage(toSelected, fromUser, topic, body)}>
            <Text>SEND MESSAGE</Text>
            <Icon name="add-event" />
          </Button>

          </View>
          
        </View>

        

        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput
            placeholder={'Compose message..'}
            style={{height: '100%', flexDirection: 'column', justifyContent: 'flex-start', width: '100%'}}
            onChangeText={(body) => this.setState({body})}
            multiline = {true}
            //numberOfLines = {2}
            value={body}
            //onChangeText={...}
          />
        </View>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _sendMessage = async (to, from, topic, body) => {
    console.log('sending..', to, body)
  }

  _fetchData = async () => {
    console.log("fetching data")
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
  }
});
