import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import { Title, TextInput } from '@shoutem/ui'
import SearchBar from '../components/common/SearchBar'
//import axios from 'axios'
//consts & comps
import MerchantCard from '../components/merchants/MerchantCard'
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { merchantsAwaiting, merchantsApproved } from "../networking/stubs";

export default class Merchants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchInput: '',
      merchantsAwaiting: [],
      merchantsApproved: [],
      merchantsApprovedDisp: []
    }
    //this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._fetchData()
  }

  // componentWillUnmount() {
  //   this.signal.cancel('API request canceled due to componentUnmount')
  // }

  render() {
    const { navigation } = this.props
    const {searchInput, merchantsAwaiting, merchantsApprovedDisp } = this.state
    return (
      <View style={styles.container}>
        <ScrollView >

          <Title style={{marginVertical: 10}}>Merchant Requests</Title>
          <FlatList
            data={merchantsAwaiting}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderNewMerch(item)}
            scrollEnabled={false}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />

          <Title>All Merchant</Title>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this._applySearch(searchInput)}
            value={searchInput}
          />

          <FlatList
            data={merchantsApprovedDisp}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderMerchant(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />
        </ScrollView>
      </View>
    )
  }

  _applySearch = (searchInput) => {
    this.setState({searchInput})
    const { merchantsApproved } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    const merchantsApprovedDisp = merchantsApproved.filter(item => {
      const standName = item.standName.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })

     this.setState({merchantsApprovedDisp})
  }

  _renderNewMerch = (merchant) => {
    const navigation = this.props.navigation
    return (
      <MerchantCard navigation={navigation} merchant={merchant} isApproved={false}/>
      )
  }

  _renderMerchant = (merchant) => {
    const navigation = this.props.navigation
    return (
      <MerchantCard navigation={navigation} merchant={merchant} isApproved={true}/>
      )
  }

 

  _fetchData = async () => {
    console.log("fetching data")
    this.setState({merchantsAwaiting, merchantsApproved, merchantsApprovedDisp: merchantsApproved})
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
    title: 'Merchants',
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
