import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

export async function signinAdmin(authPost = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/auth/signinAdmin`
    const packDataPromise = post(url, authPost, token)
    
    return packageResponse(packDataPromise)
}

export async function adminInbox(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/messages/adminInbox?hostId=${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

export async function loadSend(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/messages/loadSend?hostId=${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

export async function sendMessage(mesg = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/messages/send`
    const packDataPromise = post(url, mesg, token)
    
    return packageResponse(packDataPromise)
}

// export async function fetchLocationDetails(spotId = '', token) {
//     const url =  MID_URL + `/spotdetails?spotId=${spotId}&lat=0&long=0`
//     const packDataPromise = get(url, token)

//     return packageResponse(packDataPromise)
// }

// export async function postSpotMessage(message = {}, token) {
//     const url =  MID_URL + `/postMessage`
//     const packDataPromise = post(url, message, token)

//     return packageResponse(packDataPromise)
// }

// export async function getSpotMessages(spotId = '', token) {
//     const url =  MID_URL + `/spotMessages?spotId=${spotId}`
//     const packDataPromise = get(url, token)

//     return packageResponse(packDataPromise)
// }


// async function packageResponse(nwRequest) {
//     let packagedResp = {code: 500, data: {}}

//     try{
//         const input = await nwRequest
//         const { status } = input.request
//         packagedResp = processResponseCode(status, input)
//     } catch (err) { //Catch request failure errors
//         let connection = ''
//         try{
//              connection = await NetInfo.getConnectionInfo()
//         } catch(err){}

//         if(connection.type == 'none' || connection.type == 'unknown'){
//             packagedResp = {
//                 code: 520,
//                 data: "You do not have an active network connection. Check if Mobile Data Settings is enabled for this app, or investigate you connection."
//             }
//         }
//         else if (err.code == 'ECONNABORTED'){
//             packagedResp = {
//                 code: 408,
//                 data: "The request to get the data timed-out. Please see if you can get a better network connection"
//             }
//         } else {
//             packagedResp = {
//                 code: 520,
//                 data: "Something strange went wrong while fetching the data, please notify our support if this persists"
//             }
//         }           
//    }
//     return packagedResp
//   }

//   function processResponseCode(status = 520, input = {}){
//     if(status == 200){
//         const { body } = input.data
//         return packagedResp = {
//             code: 200,
//             data: body
//         }
//     } else if (status == 500) { //Internal Server Error
//         return packagedResp = {
//             code: 500,
//             data: "There was an issue with our servers - try again in a minute, otherwise we'll sort it out"
//         }
//     } else if (status == 400 || status == 404) { //Bad Request || Not Found
//         return packagedResp = {
//             code: status,
//             data: "Something went wrong on our side while getting the data you need - if the problem persists, please notify our support!"
//         }
//     } else if (status == 407 || status == 511) { //Proxy Authentication Required || Network Authentication Required
//         return packagedResp = {
//             code: status,
//             data: "There seems to an issue with your proxy - please authenticate or turn of your proxy"
//         }
//     } else if (status == 520){
//         packagedResp = {
//             code: 520,
//             data: "Something strange went wrong while fetching the data, please notify our support if this persists"
//         }
//     } else {
//         return packagedResp = {
//             code: status,
//             data: "Something strange went wrong on our side, please notify our support if this persists"
//         }
//     }
//   }