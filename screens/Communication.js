import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import { Button, Text } from '@shoutem/ui'
import CommunicCard from '../components/communication/CommunicCard'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons'
//consts & comps
import ErrorLine from "../components/common/ErrorLine"
import NoContent from "../components/common/NoContent"
import Updater from "../components/common/Updater"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import { HostID } from "../config/env"
import { asGet } from "../services/asyncStorage/asApi"
import { ProfileCnsts } from "../services/asyncStorage/asConsts"
//API
import { merchantInbox } from "../networking/nm_sfx_communication"

export default class Communication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      merchId: '',
      messages: [],
      errorMessage: '',
      loading: false,
      shouldRefresh: false
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = async () => {
    let merchId = await asGet(ProfileCnsts.id)
    await this.setState({merchId})
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    const { messages, loading, shouldRefresh, errorMessage } = this.state
    return (
      <View style={styles.container}>
        <Updater shouldRefresh={shouldRefresh} onRefresh={() => this._fetchData()} doneRefresh={() => this.setState({shouldRefresh: false})} />
        <ScrollView 
          refreshControl={ <RefreshControl refreshing={loading} nRefresh={() => this._fetchData()} />} 
        >
          <ErrorLine errorMessage={errorMessage}/>
          {/* <Button 
            style={styles.addButton} 
            onPress={ 
              async () => { await this.setState({shouldRefresh: true})
              this.props.navigation.navigate('CommunicationView')}}
          >
            <Text>VIEW</Text>
            <MaterialCommunityIcons name="email-plus-outline" size={22} />
          </Button> */}

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
      <CommunicCard doNavigate={async () => {
        await this.setState({shouldRefresh: true})
        navigation.navigate('CommunicationView', {message: message}) }} 
        message={message}/>
      )
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    let merchantId = this.state.merchId
    const response = await merchantInbox(merchantId, HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        messages: response.data,
        loading: false,
        errorMessage: null
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
    backgroundColor: colors.pViewBg
  },
  addButton: {
    marginVertical: 18, 
    marginHorizontal: 45, 
    ...styleConsts.buttonBorder
  }
});
