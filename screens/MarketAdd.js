import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, Title, Icon, TextInput } from '@shoutem/ui'
import DatePicker from 'react-native-datepicker'
import SearchBar from '../components/common/SearchBar'
import AttendanceCard from '../components/markets/AttendanceCard'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import moment from 'moment'
//consts & comps
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env"
import { incompleteFields, systemAlert } from "../services/systemAlerts"
//API
import { loadCreate, createMarket } from "../networking/nm_sfx_markets";

export default class MarketAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      attendances: [],
      attendancesDisp: [],

      attendancesNew: [],
      loadingModal: false,

      name: '', 
      description: '', 
      takeNote: '', 
      setupStart: null, 
      marketStart: null, 
      marketEnd: null,
      verifySubmit: false,

      searchInput: ''
    }

    this.signal = axios.CancelToken.source()
  }
  

  componentDidMount = async () => {
    await this._fetchData()
    console.log(this.state.attendances)
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    const { verifySubmit, name, description, takeNote, setupStart, marketStart, marketEnd, searchInput, attendancesDisp, loading } = this.state
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>

        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, width: '100%', padding: 10}}>
          <Title style={{color: colors.pWhite}}>Market Information</Title>

          { verifySubmit ? 
          (<View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => loading ? null : this._createMarket()}>
              {!loading ? <Text>CONFIRM</Text> : <ActivityIndicator/>}
              <AntDesign name="check" size={22} />
            </Button>
            <Button style={{marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => loading ? null : this.setState({verifySubmit: false})}>
              <Text>CANCELL</Text>
              <AntDesign name="close" size={22} />
            </Button>
          </View>)
          : (<View>
            <Button style={{marginHorizontal: 10, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => this.setState({verifySubmit: true})}>
              <Text>CREATE</Text>
              <Icon name="plus-button" />
            </Button>
          </View>) }

        </View>
        
        <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Name: </Text>
            </View>
            <TextInput
              placeholder={'Short name for the market instance'}
              onChangeText={(name) => this.setState({name})}
              style={styles.textInput}
              maxLength={28}
              value={name}
            />
          </View>

          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Description: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={80}
              value={description}
            />
          </View>

          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Setup Start: </Text>
            </View>
            <DatePicker
              style={{width: 200,  padding: 0, margin: 0, flexDirection: 'column', justifyContent: 'center'}}
              date={setupStart}
              mode="datetime"
              placeholder="--select a date--"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-03-01"
              maxDate="2025-12-01"
              confirmBtnText="Select"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 36, 
                  borderWidth: 0,
                  flexDirection: 'row', 
                  justifyContent: 'flex-start',
                  padding: 0, margin: 0
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(setupStart) => {console.log(setupStart)
                this.setState({setupStart})}}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market Start: </Text>
            </View>
            <DatePicker
              style={{width: 200,  padding: 0, margin: 0, flexDirection: 'column', justifyContent: 'center'}}
              date={marketStart}
              mode="datetime"
              placeholder="--select a date--"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-03-01"
              maxDate="2025-12-01"
              confirmBtnText="Select"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 36, 
                  borderWidth: 0,
                  flexDirection: 'row', 
                  justifyContent: 'flex-start',
                  padding: 0, margin: 0
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(marketStart) => {this.setState({marketStart})}}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market End: </Text>
            </View>
            <DatePicker
              style={{width: 200,  paddingHorizontal: 0, marginHorizontal: 0}}
              date={marketEnd}
              mode="datetime"
              placeholder="--select a date--"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-03-01"
              maxDate="2025-12-01"
              confirmBtnText="Select"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 36, 
                  borderWidth: 0,
                  flexDirection: 'row', 
                  justifyContent: 'flex-start',
                  padding: 0, margin: 0
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(marketEnd) => {this.setState({marketEnd})}}
            />
          </View>
          <View style={styles.divider}/>

          <View style={[styles.lineContainer, {height: 110}]}>
            <View style={styles.titleBox}>
              <Text>Take Note: </Text>
            </View>
            <TextInput
              placeholder={'Information that will be usefull to the attendances'}
              onChangeText={(takeNote) => this.setState({takeNote})}
              style={styles.textInput}
              maxLength={300}
              value={takeNote}
              multiline = {true}
            />
          </View>

          <View style={[styles.divider, {marginBottom: 8}]}/>

          <View style={{flexDirection: 'row', justifyContent: 'center', height: 55, backgroundColor: colors.primary, width: '100%', padding: 10}}>
            <Title style={{color: colors.pWhite}}>Attendances</Title>
          </View>

          </View>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this._applySearch(searchInput)}
            value={searchInput}
          />

          <FlatList
            data={attendancesDisp}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAttendance(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />

        </ScrollView>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _renderAttendance = (attendance = {}) => {
    return (
      <AttendanceCard isCreate={true} attendance={attendance} removeAttendance={this._removeAttendance}/>
      )
  }

  _createMarket = async () => {
    this.setState({ loading: true })
    const { attendances, name, takeNote, description, setupStart, marketStart, marketEnd } = this.state
    let merchsIn = attendances.map((val, ind) => {
      return val.merchant.id
    })
    if(attendances.length == 0) {
      systemAlert('Content Required', 'A market must have at least one attendance.')
      this.setState({
        verifySubmit: false,
        loading: false
      })
      return
    }
    if(name == '' || description == '' || setupStart == null || marketStart == null || marketEnd == null){
      incompleteFields()
      this.setState({
        verifySubmit: false,
        loading: false
      })
      return
    }
    const createBody = {
      hostId: HostID,
      name: name,
      description: description,
      takeNote: takeNote,
      merchantIds: merchsIn,
      setupStart: moment(setupStart, "MMM Do YYYY, h:mm a"),
      marketStart: moment(marketStart, "MMM Do YYYY, h:mm a"),
      marketEnd: moment(marketEnd, "MMM Do YYYY, h:mm a")
    }
    console.log('createBody', createBody)
    const response = await createMarket(createBody, this.signal.token)
    if (response.code == 200) {
      await this.setState({ loading: false, verifySubmit: false }) 
      this.props.navigation.goBack()
    } else {
      this.setState({
        errorMessage: response.data,
        verifySubmit: false,
        loading: false
      })
    }
  }

  _applySearch = (searchInput) => {
    this.setState({searchInput})
    const { attendances } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    const attendancesDisp = attendances.filter(item => {
      const standName = item.merchant.name.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })
     this.setState({attendancesDisp})
  }

  _removeAttendance = (id = '') => {
    let cAttendances = this.state.attendances
    let attendances = cAttendances.filter(function(att, index, arr){
      return att.merchant.id != id
    })
    this.setState({attendancesDisp: attendances, attendances})
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    const response = await loadCreate(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        attendances: response.data.attendances,
        attendancesDisp: response.data.attendances,
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
    paddingHorizontal: 10,
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
    width: '90%'
  },
  titleBox: {
    width: 95,
    marginLeft: 12
  },
})