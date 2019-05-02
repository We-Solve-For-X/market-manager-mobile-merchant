import { get, post, patch } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'attendances'

export async function load(merchantId = '', token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/${merchantId}`
    const packDataPromise = get(url, token)
    
    return packageResponse(packDataPromise)
}

export async function fetch(attendanceId = '', token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${attendanceId}`
    console.log(url)
    const packDataPromise = get(url, token)
    
    return packageResponse(packDataPromise)
}

export async function submitPayment(invoiceId = '', token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/invoices/${invoiceId}/submit`
    const packDataPromise = post(url, {}, token)
    
    return packageResponse(packDataPromise)
}

// export async function updateMerchant(patchBody = {}, merchantId = '', token) {
//     //Will be changed to a post soon
//     const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/${merchantId}`
//     const packDataPromise = patch(url, patchBody, token)
    
//     return packageResponse(packDataPromise)
// }

// export async function updatePriceZones(hostId = '', patchBody = {}, administratorId = '', token) {
//     //Will be changed to a post soon
//     const url =  MARKMAN_BASE_URL + `/${MID_URL}/hosts/${hostId}/pricezones`
//     const packDataPromise = patch(url, patchBody, token)
    
//     return packageResponse(packDataPromise)
// }



