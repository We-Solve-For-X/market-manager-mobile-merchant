import { AsyncStorage } from 'react-native'
import { ProfileCnsts } from '../asyncStorage/asConsts'

export async function asSet(key = '', value = ''){
  try{
    await AsyncStorage.setItem(key, value)
    return true
  } catch (err){
    console.log("[i]: Async Storage Set Error: ", err)
    return false
  }
}

export async function asMultiSet(pairs = []){
    //example: multiSet([['k1', 'val1'], ['k2', 'val2']], cb)
    try{
      await AsyncStorage.multiSet(pairs)
      return true
    } catch (err){
      console.log("[i]: Async Storage MultiSet Error: ", err)
      return false
    }
}

export async function asGet(key = '') {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
        return value
        }
    } catch (error) {
        console.log("[i]: Async Storage MultiSet Error: ", err)
        return null
    }
}


export async function asMultiGet (keys = []) {
  try {
    let returnData = {}
    await AsyncStorage.multiGet(keys, async (err, data) => {
      if (err) {
        console.log('[i]: asyncStorageGet error: ', err)
        return null
      }

      data.forEach((res, i, store) => {
        let key = store[i][0]
        let val = store[i][1]

        const item = {
          [key]: val
        }

        Object.assign(returnData, item)
      })
    })
    
    return returnData
  } catch (error) {
      console.log('[i]: asyncStorageGet error: ', error)
      return null
  }
}


export async function asSetProfile(profile = {}, username = ''){
    let uname = [ProfileCnsts.username, username]
    let stName = [ProfileCnsts.standName, profile.name]
    let rpName = [ProfileCnsts.repName, profile.repName]
    let surname = [ProfileCnsts.repSurname, profile.repSurname]
    let id = [ProfileCnsts.id, profile.id]

    res = await asMultiSet([uname, stName, rpName, surname, id])
    return res
}

export async function asClearProfile(){
  let uname = [ProfileCnsts.username, '']
  let stName = [ProfileCnsts.standName, '']
  let rpName = [ProfileCnsts.repName, '']
  let surname = [ProfileCnsts.repSurname, '']
  let id = [ProfileCnsts.id, '']

  res = await asMultiSet([uname, stName, rpName, surname, id])
  return res
}

// export async function asGetProfile(profile = {}, username = ''){
//   console.log(profile)
//   let name = await asGet(ProfileCnsts.name)
//   let surname = await asGet(ProfileCnsts.surname)
//   let email = await asGet(ProfileCnsts.email)
//   let role = await asGet(ProfileCnsts.role)
//   let username = await asGet(ProfileCnsts.username)

//   profile = {
//     username = username,
//     name = name,
//     surname = surname,
//     email = email,
//     role = role
//   }

//   return profile
// }