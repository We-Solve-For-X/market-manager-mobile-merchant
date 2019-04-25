import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Modal, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { isTablet } from "../constants/platform"
import { Text, Button, Title, Icon, TextInput } from '@shoutem/ui'
import LineInput from "../components/common/LineInput"
import LineView from "../components/common/LineView"
import SearchBar from '../components/common/SearchBar'
import AttendanceCard from '../components/markets/AttendanceCard'
import AttendanceAddCard from '../components/markets/AttendanceAddCard'
import { Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import moment from 'moment'
//consts & comps
import ViewSwitch from "../components/common/ViewSwitch"
import NoContent from "../components/common/NoContent"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env"
//API
import { view, loadAdd, deleteMarket } from "../networking/nm_sfx_markets"

export default class MarketDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      market: {},
      attendances: [],
      attendancesDisp: [],
      loading: false,
      newAttendances: [],
      newAttendancesDisp: [],
      confirmDelete: false,
      deleting: false,
      addModal: false,
      searchInput: '',
      modalSearchInput: ''
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
    const { confirmDelete, market, searchInput, addModal, modalSearchInput, newAttendancesDisp, deleting, loading, attendancesDisp } = this.state
    const { id, unCode, name, description, takeNote, setupStart, marketStart, marketEnd, standPrices, nAttendances, nInvPayed, nInvOuts, nInvSubm  } = market

    return (
      <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={addModal}
        >
          <View style={styles.modalContainer}>
          <View style={styles.mdInner}>
          <View style={styles.mdHide}>
            <Title style={styles.title}>Add Merchants</Title>
            <Button style={styleConsts.button} onPress={() => this._toggleModal(false)}>
              <Text>Done</Text>
              <ViewSwitch hide={!isTablet}>
                <MaterialIcons name={'done'} size={22}/>
              </ViewSwitch>
            </Button>
          </View>
          <ScrollView 
            refreshControl={
              <RefreshControl
                refreshing={loading}
                enabled={false}
              />
            }
          >
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (input) => this._applyModalSearch(input)}
            value={modalSearchInput}
          />
          <FlatList
            data={newAttendancesDisp}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAddAttendance(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            ListEmptyComponent={<NoContent refresh={false}/>}
            />
          </ScrollView>
              
          </View>
          </View>
        </Modal>



      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={loading}
            enabled={false}
          />
        }
      >
        <View style={styles.subCont}>

        <View style={styles.deleteCon}>
          <Title style={styles.title}>Market Information</Title>
          { confirmDelete ? 
          (<View style={styles.deleteCon2}>
            <Button style={styleConsts.button} onPress={() => deleting ? null : this._deleteMarket()}>
              <ViewSwitch hide={!isTablet}>
                <Text>CONFIRM</Text>
              </ViewSwitch>
              {deleting ? <ActivityIndicator/> : <AntDesign name="check" size={22} />}
            </Button>
            <Button style={styleConsts.button} onPress={() => deleting ? null : this.setState({confirmDelete: false})}>
              <ViewSwitch hide={!isTablet}>
                <Text>CANCELL</Text>
              </ViewSwitch>
              <AntDesign name="close" size={22} />
            </Button>
          </View>)
          : (<View>
            <Button style={styles.button} onPress={() => this.setState({confirmDelete: true})}>
              <ViewSwitch hide={!isTablet}>
                <Text>DELETE</Text>
              </ViewSwitch>
              <MaterialCommunityIcons name="delete-outline" size={25} color={colors.pBlack} style={{paddingHorizontal: 0, marginHorizontal: 0}} />
            </Button>
          </View>) }
        </View>
        
          <LineView title={'Name'}    value={name}/>
          <View style={styles.divider}/>
          <LineView title={'Description'}    value={description}/>
          <View style={styles.divider}/>
          <LineView title={'Attendances'}    value={`${nAttendances}`}/>
          <View style={styles.divider}/>
          <LineView title={'Payments'}    value={`${nInvPayed} Payed / ${nInvSubm} Submitted / ${nInvOuts} Outstanding `}/>
          <View style={styles.divider}/>
          <LineView title={'Market Code'}    value={unCode ? `${unCode}` : null}/>
          <View style={styles.divider}/>
          <LineView title={'Setup Start'}    value={moment(setupStart).format("dddd Do MMM YYYY HH:mm")}/>
          <View style={styles.divider}/>
          <LineView title={'Market Start'}    value={moment(marketStart).format("dddd Do MMM YYYY HH:mm")}/>
          <View style={styles.divider}/>
          <LineView title={'Market End'}    value={moment(marketEnd).format("dddd Do MMM YYYY HH:mm")}/>
          <View style={styles.divider}/>
          <LineView title={'Take Note'}    value={takeNote}/>
          <View style={[styles.divider, {marginBottom: 8}]}/>

          <View style={styles.addCont}>
            <Title style={styles.title}>Attendances</Title>
            <Button style={styleConsts.button} onPress={() => this._toggleModal(true)}>
              <ViewSwitch hide={!isTablet}>
                <Text>ADD</Text>
              </ViewSwitch>
              <AntDesign name="adduser" size={25}/>
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
            data={attendancesDisp}
            contentContainerStyle={{paddingHorizontal: 13}}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAttendance(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            ListEmptyComponent={<NoContent refresh={true}/>}
            />

        </ScrollView>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _renderAttendance = (attendance = {}) => {
    return (
      <AttendanceCard isCreate={false} attendance={attendance} updateParent={this._fetchData}/>
      )
  }

  _renderAddAttendance = (attendance = {}) => {
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
        await this.setState({
          newAttendances: response.data.attendances,
          newAttendancesDisp: response.data.attendances,
          modalLoad: false
        }) 
      } else {
        await this.setState({
          errorMessage: response.data,
          modalLoad: false
        })
      }
    } else {
      await this._fetchData()
    }
  }

  _applySearch = (searchInput) => {
    this.setState({searchInput})
    const { attendances } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    const attendancesDisp = attendances.filter(item => {
      const standName = item.merchant.name.toLowerCase().replace(" ", "")
      const refNum = item.invoice.refNum.toLowerCase().replace(" ", "")
      return standName.includes(query) || refNum.includes(query)
     })
     //FIXME: prevent reload every time modal is hiden to optimise data transfer
     this.setState({attendancesDisp})
  }

  _applyModalSearch = (modalSearchInput) => {
    this.setState({modalSearchInput})
    const { newAttendances } = this.state
    const query = modalSearchInput.toLowerCase().replace(" ", "")
    const newAttendancesDisp = newAttendances.filter(item => {
      const standName = item.merchant.name.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })
     //FIXME: prevent reload every time modal is hiden to optimise data transfer
     this.setState({newAttendancesDisp})
  }

  _deleteMarket = async () => {
    let id = this.state.id
    this.setState({ deleting: true })
    const response = await deleteMarket(id, this.signal.token)
    if (response.code == 200) {
      this.props.navigation.goBack()
    } else {
      await this.setState({
        errorMessage: response.data,
        deleting: false
      })
    }
  }

  _removeNewAttendance = (id = '') => {
    let cAttendances = this.state.newAttendances
    let newAttendances = cAttendances.filter(function(att, index, arr){
      return att.merchant.id != id
    })
    this.setState({newAttendances, newAttendancesDisp: newAttendances, modalSearchInput: ''})
  }


  _fetchData = async () => {
    this.setState({ loading: true })
    const idIn = this.props.navigation.state.params.id
    const response = await view(idIn, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        market: response.data.market,
        attendances: response.data.attendances,
        attendancesDisp: response.data.attendances,
        id: idIn,
        loading: false
      }) 
    } else {
      await this.setState({
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
    //paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1, 
    padding: isTablet ? 80 : 16, 
    backgroundColor: colors.pBlackTransp, 
    flexDirection: 'column', 
    justifyContent: 'flex-start'
  },
  mdInner: {
    backgroundColor: colors.pGrey, 
    padding: 15, 
    width: '100%', 
    height: '100%'
  },
  mdHide: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  title: {
    color: colors.pWhite
  },
  subCont: {
    width: '100%', 
    flexDirection: 'column', 
    alignItems: 'center'
  },  
  deleteCon: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  deleteCon2: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  addCont: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  button: { 
    //height: 28,
    paddingHorizontal: 7, 
    height: 38,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.secondary, 
    ...styleConsts.buttonBorder
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