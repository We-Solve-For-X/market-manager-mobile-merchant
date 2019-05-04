import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import axios from 'axios'
//consts & comps
import ErrorLine from "../components/common/ErrorLine"
import AttendanceCard from '../components/markets/AttendanceCard'
import NoContent from "../components/common/NoContent"
import Updater from "../components/common/Updater"
import colors from '../constants/colors'
import { asGet } from "../services/asyncStorage/asApi"
import { ProfileCnsts } from "../services/asyncStorage/asConsts"

//API
import { load } from "../networking/nm_sfx_attendances";

export default class Attendances extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      attendances: [],
      shouldRefresh: false
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
    const { attendances, loading, nFuture, nPast, shouldRefresh, errorMessage } = this.state
    
    return (
      <View style={styles.container}>
        <Updater shouldRefresh={shouldRefresh} onRefresh={this._fetchData} doneRefresh={() => this.setState({shouldRefresh: false})} />
        <ScrollView
          refreshControl={ <RefreshControl refreshing={loading} onRefresh={() => this._fetchData()}/> }
        >
          <ErrorLine errorMessage={errorMessage}/>
          <FlatList
            data={attendances}
            keyExtractor={(item) => item.attendanceId}
            renderItem={({item}) => this._renderAttendance(item)}
            scrollEnabled={false}
            //isLoading={loading}
            ListEmptyComponent={<NoContent refresh={true}/>}
          />
        </ScrollView>
      </View>
    )
  }

  _renderAttendance = (attendance) => {
    const navigation = this.props.navigation
    return ( <AttendanceCard navigation={navigation} attendance={attendance}/> )
  }

  _fetchData = async (silent = false) => {
    silent ? null : this.setState({ loading: true })
    let merchId = await asGet(ProfileCnsts.id)
    let response = await load(merchId, this.signal.token)
    if (response.code == 200) {
      this.setState({
        attendances: response.data,
        loading: false,
        errorMessage: null
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
  }
});
