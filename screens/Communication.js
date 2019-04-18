import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import { Button, Text, Icon } from '@shoutem/ui'
import CommunicCard from '../components/communication/CommunicCard'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons'
//consts & comps
import NoContent from "../components/common/NoContent"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env";
//API
import { messageList } from "../networking/stubs"
import { adminInbox } from "../networking/nm_sfx_communication"

export default class Communication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      errorMessage: '',
      loading: false
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
    const { messages, loading } = this.state
    return (
      // <View style={styles.container}>
      //   <Text>Communication</Text>
      //   <Button title="Communication New" onPress={() => this.props.navigation.navigate('CommunicationNew')} />
      //   <Button title="Communication View" onPress={() => this.props.navigation.navigate('CommunicationView')} />
    
      // </View>


      <View style={styles.container}>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this._fetchData()}
            />
          }
          >

          <Button style={{marginVertical: 18, marginHorizontal: 45, ...styleConsts.buttonBorder}} onPress={() => this.props.navigation.navigate('CommunicationNew')}>
            <Text>NEW MESSAGE</Text>
            <MaterialCommunityIcons name="email-plus-outline" size={22} />
          </Button>

          <FlatList
            data={messages}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderMessage(item)}
            scrollEnabled={false}
            // isLoading={false}
            ListEmptyComponent={<NoContent refresh={true}/>}
          />

        </ScrollView>

      </View>
    )
  }

  _renderMessage = (message) => {
    const navigation = this.props.navigation
    return (
      <CommunicCard navigation={navigation} message={message}/>
      )
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    const response = await adminInbox(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        messages: response.data,
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
    title: 'Communication',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.pViewBg,
  },
});
