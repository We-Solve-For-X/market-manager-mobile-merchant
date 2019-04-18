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
    console.log(profile)
    let uname = [ProfileCnsts.username, username]
    let name = [ProfileCnsts.name, profile.name]
    let surname = [ProfileCnsts.surname, profile.surname]
    let email = [ProfileCnsts.email, profile.email]
    let role = [ProfileCnsts.role, profile.role]
    let id = [ProfileCnsts.adminstId, profile.id]

    res = await asMultiSet([uname, name, surname, email, role, id])
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