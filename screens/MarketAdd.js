import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Button, Text, Icon } from '@shoutem/ui'
import ButtonFloat from '../components/common/ButtonFloat'
import AttendanceCard from '../components/markets/AttendanceCard'
import SearchBar from '../components/common/SearchBar'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API

export default class MarketAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchInput: '',
      verifySubmit: false
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
    const {loading, searchInput, verifySubmit } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* drop down details */}
          <View>
            
          </View>
          

          {/* details text in */}
          <View>
            
          </View>

          {/* submit */}
          { !verifySubmit ? 
          (<View>
            <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this.setState({verifySubmit: true})}>
              <Text>PREPARE SUBMITION</Text>
              <Icon name="add-event" />
            </Button>
          </View>)
          : (null) }
          { verifySubmit ? 
          (<View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this.setState({verifySubmit: true})}>
              <Text>YES, ADD IT</Text>
              <Icon name="add-event" />
            </Button>
            <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this.setState({verifySubmit: false})}>
              <Text>WAIT - CANCEL</Text>
              <Icon name="add-event" />
            </Button>
          </View>)
          : (null) }
          
          

          {/* search */}
          <View>
            <SearchBar
              placeholder={'Find a Merchant'} 
              onChangeText={(searchInput) => this.setState({searchInput})}
              value={searchInput}/>
          </View>

          {/* cards */}
          

          <FlatList
            data={[{a: 'Market 1'}, {a : 'Market 2'}]}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAttendance()}
            scrollEnabled={false}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />





        
        </ScrollView>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _renderAttendance = () => {
    const navigation = this.props.navigation
    return (
      <AttendanceCard/>
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
    title: 'Links',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
  },
});
