import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import { Text, Heading, Subtitle, Title, TextInput, Button } from '@shoutem/ui'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
import styleConsts from '../constants/styleConsts' 
import AntDesign from '@expo/vector-icons/AntDesign';
//API

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updating: false,
      name: 'Corlia', 
      surname: 'Bredel', 
      email: 'corlia@mail.com', 
      cellphone: '082 123 4567', 
      role: 'manager'
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
    const { name, surname, email, cellphone, role, updating } = this.state
    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pGrey, ...styleConsts.viewShadow}}>
          <Title>Hi, Corlia!</Title>
          <Subtitle>Welcome to Irene Market Manager</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Markets</Heading>
          <Subtitle>Your next market is on 12 April 2019 at 08:00</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Payments</Heading>
          <Subtitle>There are 23 outstanding payments, from 18 merchants.</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Merchants</Heading>
          <Subtitle>You have 132 registered merchants on the system</Subtitle>
          <Subtitle>with 3 new merchant-requests</Subtitle>
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Host</Heading>
          <Subtitle>The following is your Host Information:</Subtitle>

          <LineView title={'Name'} value={'Irene Market'}/>
          <View style={styles.divider}/>
          <LineView title={'Contact Name'} value={'Corlia Bredel'}/>
          <View style={styles.divider}/>
          <LineView title={'Contact Number'} value={'082 123 4567'}/>
          <View style={styles.divider}/>
          <LineView title={'Email'} value={'corlia@email.com'}/>
          <View style={styles.divider}/>
          <LineView title={'Website'} value={'www.irenemarket.co.za'}/>
          <View style={styles.divider}/>
          <LineView title={'Address'} value={'The Big Red Barn, 7 Nelson road, Olifantsfontein'}/>
          <View style={styles.divider}/>
          <LineView title={'Bank Account'} value={'Bank Name, Branch Code, Acc Number'}/>
          <View style={styles.divider}/>
          <LineView title={'Price Brackets'} value={'...'}/>
    
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Profile</Heading>
          <Subtitle>The following is your Profile Information:</Subtitle>

          <LineInput title={'Name'} value={name} onChange={(name) => this.setState({name})}/>
          <View style={styles.divider}/>
          <LineInput title={'Surname'} value={surname} onChange={(surname) => this.setState({surname})}/>
          <View style={styles.divider}/>
          <LineInput title={'Email'} value={email} onChange={(email) => this.setState({email})}/>
          <View style={styles.divider}/>
          <LineInput title={'Cellphone'} value={cellphone} onChange={(cellphone) => this.setState({cellphone})}/>
          <View style={styles.divider}/>
          <LineInput title={'Role'} value={role} onChange={(role) => this.setState({role})}/>
          <View style={styles.divider}/>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button 
            style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder, width: 115}} 
            onPress={() => this.setState({updating: true})}>
            <Text>UPDATE</Text>
            {updating ? 
            <ActivityIndicator size="small" color={colors.pBlack} />
            : 
            <AntDesign name="clouduploado" size={22} />
            }
          </Button>   
          </View> 
        </View>

        <View style={{ margin: 10, padding: 5, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
          <Heading>Credentials</Heading>
          <Subtitle>Edit your sign-in credentials:</Subtitle>

          <LineView title={'Username'} value={name} onChange={(name) => this.setState({name})}/>
          <View style={styles.divider}/>
          <LineInput title={'Current Password'} value={'...'} onChange={(surname) => this.setState({surname})}/>
          <View style={styles.divider}/>
          <LineInput title={'New Password'} value={'...'} onChange={(email) => this.setState({email})}/>
          <View style={styles.divider}/>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button 
            style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder, width: 115}} 
            onPress={() => this.setState({updating: true})}>
            <Text>UPDATE</Text>
            {updating ? 
            <ActivityIndicator size="small" color={colors.pBlack} />
            : 
            <AntDesign name="clouduploado" size={22} />
            }
          </Button>   
          </View> 
        </View>


        </ScrollView>
      </View>
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
    title: 'Home',
    header: null
  }
}

const LineView = ({title, value}) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.titleBox}>
        <Text>{title}: </Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={value}
        editable={false}
      />
    </View>
  )
}

const LineInput = ({title, value, onChange}) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.titleBox}>
        <Text>{title}: </Text>
      </View>
      <TextInput
        placeholder={'Message Topic'}
        onChangeText={onChange}
        style={styles.textInput}
        //maxLength={28}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    //padding: 10
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
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
    width: '100%'
  },
  titleBox: {
    width: 120,
    marginLeft: 12
  }
});
