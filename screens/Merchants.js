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

export default class Merchants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchInput: ''
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
    const {searchInput } = this.state
    return (
      <View style={styles.container}>
        <ScrollView >

          <Title>Merchant Requests</Title>
          <FlatList
            data={[{a: 'Market 1'}, {a : 'Market 2'}]}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderNewMerch(item.a)}
            scrollEnabled={false}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />

          <Title>All Merchant</Title>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={(searchInput) => this.setState({searchInput})}
            value={searchInput}
          />

          <FlatList
            data={[{a: 'Market 1'}, {a : 'Market 2'}]}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderMerchant(item.a)}
            scrollEnabled={false}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />
        </ScrollView>
      </View>
    )
  }

  _renderMerchant = (market) => {
    const navigation = this.props.navigation
    return (
      <MerchantCard navigation={navigation} market={market}/>
      )
  }

  _renderNewMerch = (market) => {
    const navigation = this.props.navigation
    return (
      <MerchantCard navigation={navigation} market={market}/>
      )
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
    title: 'Merchants',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
  },
});
