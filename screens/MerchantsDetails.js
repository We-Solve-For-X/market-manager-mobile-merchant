import React from 'react';
import { View, StyleSheet, Switch, TouchableOpacity, Picker } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, TextInput } from '@shoutem/ui'
import { EvilIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import ViewLoad from "../components/common/ViewLoad"
import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { merchant1 } from "../networking/stubs";
import { activate, deactivate, getMerch, updatePriceZone } from "../networking/nm_sfx_merchants";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class MerchantsDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      loading: false,
      activateLoading: false,
      merchant: {},

      priceZoneBrackets: [],
      updatePrZone: false,
      updatingPz: false
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
    const { merchant, priceZoneBrackets, updatePrZone, updatingPz } = this.state
    const { repName, repSurname, repEmail, repCell, name, legalName, description } = merchant
    const { isActive, hostId, authId, status, category, standId, priceZone } = merchant

    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <EvilIcons name="cart" size={60} style={{marginLeft: 10}}/>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15}}>
            <Text style={styles.text1} >{name ? name : null}</Text>
            <Text style={styles.text2}>{legalName ? legalName : '(no legal name)'}</Text>
            <Text style={styles.text3}>{description ? description : null}</Text>
          </View>
        </View>

        <View style={styles.dividerBig}/>

          <DataHeading icon={'user'} title={'Representative'}/>
          <DataRow title={'Name'} text={repName ? repName : null}/>
          <DataRow title={'Surname'} text={repSurname ? repSurname : null}/>
          <DataRow title={'Email'} text={repEmail ? repEmail : null}/>
          <DataRow title={'Cell'} text={repCell ? repCell : null}/>

        <View style={styles.divider}/>

        <DataHeading icon={'pencil'} title={'Meta'}/>
          <DataRow title={'Status'} text={status ? status : null}/>
          <DataRow title={'Is Active'} text={isActive != null ? `${isActive}` : null}/>
          <DataRow title={'Stand'} text={standId ? standId : '(no stand id)'}/>
          <DataRow title={'Category'} text={category ? category : null}/>
        <View style={styles.divider}/>

        <View style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
          <DataHeading icon={'gear'} title={'Settings'}/>
          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.text3}>{'Active: '}</Text>
            </View>
            <Switch
                onValueChange={() => this.state.activateLoading ? null : this._toogleState(isActive)}
                value={isActive}
                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                trackColor={{false: colors.pRed, true: colors.pGreen}}
              />
            <ViewLoad hide={this.state.activateLoading}/>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.text3}>{'Price Zone: '}</Text>
            </View>
            <View style={{flexDirection: 'column', width: '100%'}}> 
              
              {!updatePrZone ? 
                (<View>
                  <TouchableOpacity style={{marginLeft: 8, margin: 2, flexDirection: 'row'}} onPress={() => this.setState({updatePrZone: true})}>
                    <Text> {priceZone ? priceZone.name : null}</Text>
                    <FontAwesome size={15} name="sort-down" style={{marginHorizontal: 9}} />
                  </TouchableOpacity>
                </View>)
                :
                (<ViewLoad hide={updatingPz}>
                  {priceZoneBrackets.map( (bracket) => {
                    return (
                      <TouchableOpacity style={{marginVertical: 5, marginHorizontal: 8, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => this._updatePriceBracket(bracket)}>
                        <MaterialCommunityIcons size={22} name="square-inc-cash" /> 
                        <Text>  R{bracket.cost}: {bracket.name}</Text>
                      </TouchableOpacity>
                    )})
                  }
                </ViewLoad>) 
              }

            </View>
          </View>


          
        </View>

        <View style={styles.divider}/>

  
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _updatePriceBracket = async ({key, name, cost}) => {
    this.setState({updatingPz: true})
    let id = this.state.id
    let priceZone = {key, name}
    let response = await updatePriceZone(id, priceZone, this.signal.token)
    if (response.code == 200) {
      await this.setState({
        updatingPz: false,
        updatePrZone: false
      }) 
      this._fetchData()
    } else {
      this.setState({
        errorMessage: response.data,
        updatingPz: false
      })
    }
  }

  _toogleState = async (isActive = false) => {
    let id = this.state.id
    this.setState({activateLoading: true})
    const response = isActive ? await deactivate(id, this.signal.token) : await activate(id, this.signal.token)
    if (response.code == 200) {
      await this._fetchData()
      this.setState({
        activateLoading: false,
      }) 
    } else {
      this.setState({
        errorMessage: response.data,
        activateLoading: false
      })
    }
  }

  _fetchData = async () => {
    const idIn = this.props.navigation.state.params.id
    this.setState({ loading: true, id: idIn })
    const response = await getMerch(idIn, this.signal.token)
    if (response.code == 200) {
      this.setState({
        merchant: response.data.merchant,
        priceZoneBrackets: response.data.priceZoneBrackets,
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

const DataHeading = ({ icon, title }) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.headingBox}>
        <EvilIcons name={icon} size={30}/>
      </View>
      <Text style={styles.text2}>{title}</Text>
    </View>
  )
}

const DataRow = ({ title, text }) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.titleBox}>
        <Text style={styles.text3}>{title}</Text>
      </View>
      <Text style={styles.text3}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.pViewBg,
    paddingHorizontal: 8
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginVertical: 2
  },
  dividerBig: {
    width: '100%', 
    height: 3, 
    backgroundColor: colors.secondary,
    marginVertical: 5
  },
  divider: {
    width: '97%', 
    height: 2, 
    backgroundColor: colors.secondary,
    marginVertical: 5
  },
  titleBox: {
    width: 100,
    marginLeft: 12,
    
  },
  headingBox: {
    width: 100,
    marginLeft: 12,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: 2
  },
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: 2
  },
  text3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: 2
  },
  isActiveText: {
    fontSize: 15,
    color: colors.pWhite
  },
});
