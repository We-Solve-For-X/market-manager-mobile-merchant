import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Modal } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, Title, Icon, TextInput } from '@shoutem/ui'
import DatePicker from 'react-native-datepicker'
import SearchBar from '../components/common/SearchBar'
import AttendanceCard from '../components/markets/AttendanceCard'
import AttendanceAddCard from '../components/markets/AttendanceAddCard'
import { Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import moment from 'moment'
//consts & comps
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env"
//API
import { view, loadAdd } from "../networking/nm_sfx_markets"

export default class MarketDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      market: {},
      attendances: [],

      newAttendances: [],
      confirmDelete: false,
      addModal: false,
      searchInput: ''
    }

    this.signal = axios.CancelToken.source()
  }
  

  componentDidMount = () => {
    this._fetchData()
  }

  // componentWillUnmount() {
  //   this.signal.cancel('API request canceled due to componentUnmount')
  // }

  render() {
    const { navigation } = this.props
    const { confirmDelete, market, searchInput, addModal, attendances, newAttendances } = this.state
    const { id, unCode, name, description, takeNote, setupStart, marketStart, marketEnd, standPrices, nAttendances, nInvPayed, nInvOuts, nInvSubm  } = market

    return (
      <View style={styles.container}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={addModal}
          // onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          // }}
          >
          <View style={{flex: 1, padding: 80, backgroundColor: colors.pBlackTransp, flexDirection: 'column', justifyContent: 'flex-start'}}>
          <View style={{backgroundColor: colors.pGrey, padding: 15, width: '100%', height: '100%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, width: '100%', padding: 10}}>
            <Title style={{color: colors.pWhite}}>Add Merchants</Title>
            <Button onPress={() => this._toggleModal(false)}>
              <Text>Done</Text>
              <MaterialIcons name={'done'} size={22}/>
            </Button>
          </View>
          <ScrollView>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this._applySearch(searchInput)}
            value={searchInput}
          />
          <FlatList
            data={newAttendances}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAddAttendance(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />
          </ScrollView>
              
          </View>
          </View>
        </Modal>



      <ScrollView>
        <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, width: '100%', padding: 10}}>
          <Title style={{color: colors.pWhite}}>Market Information</Title>
          { confirmDelete ? 
          (<View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => this.setState({confirmDelete: true})}>
              <Text>CONFIRM</Text>
              <AntDesign name="check" size={22} />
            </Button>
            <Button style={{marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => this.setState({confirmDelete: false})}>
              <Text>CANCELL</Text>
              <AntDesign name="close" size={22} />
            </Button>
          </View>)
          : (<View>
            <Button style={{ marginHorizontal: 15, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => this.setState({confirmDelete: true})}>
              <Text>DELETE</Text>
              <MaterialCommunityIcons name="delete-outline" size={25} color={colors.pBlack} />
            </Button>
          </View>) }
        </View>
        
        <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Name: </Text>
            </View>
            <TextInput
              placeholder={'Short name for the market instance'}
              //onChangeText={(name) => this.setState({name})}
              style={styles.textInput}
              maxLength={28}
              value={name}
              editable={false}
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
              maxLength={28}
              value={description}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Attendances: </Text>
            </View>
            <TextInput
              placeholder={'No attendance count'}
              //onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={`${nAttendances}`}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Payments: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={`${nInvPayed} Payed, ${nInvOuts} Outstanding, ${nInvSubm} Awaiting Review `}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Setup Start: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              style={styles.textInput}
              maxLength={28}
              value={moment(setupStart).format("dddd Do MMM YYYY HH:mm")}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market Start: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={moment(marketStart).format("dddd Do MMM YYYY HH:mm")}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market End: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={moment(marketEnd).format("dddd Do MMM YYYY HH:mm")}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={[styles.lineContainer, {height: 110}]}>
            <View style={styles.titleBox}>
              <Text>Take Note: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={takeNote}
              editable={false}
            />
          </View>

          <View style={[styles.divider, {marginBottom: 8}]}/>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  backgroundColor: colors.primary, width: '100%', padding: 10}}>
            <Title style={{color: colors.pWhite}}>Attendances</Title>
            <Button style={{marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => this._toggleModal(true)}>
              <Text>ADD</Text>
              <Feather name="user-plus" size={22}/>
            </Button>
          </View>

          </View>
          <View>

          </View>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this._applySearch(searchInput)}
            value={searchInput}
          />

          <FlatList
            data={attendances}
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
    //const navigation = this.props.navigation
    return (
      <AttendanceCard isCreate={false} attendance={attendance}/>
      )
  }

  _renderAddAttendance = (attendance = {}) => {
    //const navigation = this.props.navigation
    let id = this.state.id
    return (
      <AttendanceAddCard marketId={id} attendance={attendance} removeNewAttendance={this._removeNewAttendance} />
      )
  }

  _toggleModal = async (expand = false) => {
    this.setState({ addModal: expand, modalLoad: true })

    if(expand){
      let id = this.state.id
      const response = await loadAdd(HostID, id, this.signal.token)
      console.log(response)
      if (response.code == 200) {
        this.setState({
          newAttendances: response.data.attendances,
          modalLoad: false
        }) 
      } else {
        this.setState({
          errorMessage: response.data,
          modalLoad: false
        })
      }
    } else {
      this._fetchData()
    }
  }

  _applySearch = (searchInput) => {
    this.setState({searchInput})
    const { merchants } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    const merchantsDisp = merchants.filter(item => {
      const standName = item.standName.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })
     //FIXME: prevent reload every time modal is hiden to optimise data transfer
     this.setState({merchantsDisp})
  }

  _removeNewAttendance = (id = '') => {
    console.log('removing..')
    let cAttendances = this.state.newAttendances
    let newAttendances = cAttendances.filter(function(att, index, arr){
      return att.merchant.id != id
    })
    this.setState({newAttendances})
  }


  _fetchData = async () => {
    this.setState({ loading: true })
    const idIn = this.props.navigation.state.params.id
    const response = await view(idIn, this.signal.token)
    if (response.code == 200) {
      this.setState({
        market: response.data.market,
        attendances: response.data.attendances,
        id: idIn,
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