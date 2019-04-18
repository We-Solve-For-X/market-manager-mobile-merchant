import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import { Button, Text, Icon } from '@shoutem/ui'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
//consts & comps
import MarketCard from '../components/markets/MarketCard'
import NoContent from "../components/common/NoContent"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env"

//API
import { load } from "../networking/nm_sfx_markets";

export default class Markets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nFuture: 0,
      nPast: 0,
      loading: false,
      markets: []
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
    const { markets, loading, nFuture, nPast } = this.state
    
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this._fetchData()}
            />
          }
        >
          <Button style={styles.crButton} onPress={() => this.props.navigation.navigate('MarketAdd')}>
            <Text>CREATE NEW MARKET</Text>
            <FontAwesome size={22} name="calendar-plus-o" /> 
          </Button>
          <FlatList
            data={markets}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderMarket(item)}
            scrollEnabled={false}
            //isLoading={loading}
            ListEmptyComponent={<NoContent refresh={true}/>}
          />
        </ScrollView>
      </View>
    )
  }

  _renderMarket = (market) => {
    const navigation = this.props.navigation
    return (
      <MarketCard navigation={navigation} market={market}/>
      )
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    const response = await load(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        nFuture: response.data.nFuture,
        nPast: response.data.nPast, 
        markets: response.data.markets,
        loading: false
      }) 
    } else {
      this.setState({
        errorMessage: response.data,
        markets: [],
        loading: false
      })
    }
  }

  static navigationOptions = {
    title: 'Markets',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    paddingHorizontal: 10,
  },
  crButton: {
    marginVertical: 18, 
    marginHorizontal: 45, 
    ...styleConsts.buttonBorder
  }
});
