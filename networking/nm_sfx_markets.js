import { get, post, dellete } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'markets'

// export async function submitPayment(payment = {}, token) {
//     //Will be changed to a post soon
//     const url =  MARKMAN_BASE_URL + `/${MID_URL}/payment`
//     const packDataPromise = post(url, payment, token)
    
//     return packageResponse(packDataPromise)
// }

// LoadMarkets(nFuture: Int,
//             nPast: Int,
//             markets: List[Market])
export async function load(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)

}

export async function view(marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/details/${marketId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}


// ???
export async function dataMail(marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/dataMail?marketId=${marketId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}


// case class LoadAdd(merchants: List[Merchant.Summary])
export async function loadAdd(hostId = '', marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/available/${hostId}/${marketId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

// Boolean
export async function addMerchant(marketId = '', merchantId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchant/${marketId}/${merchantId}`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

export async function deleteMarket(marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${marketId}`
    const packDataPromise = dellete(url, token)

    return packageResponse(packDataPromise)
}

export async function removeAttendance(attendanceId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/attendance/${attendanceId}`
    const packDataPromise = dellete(url, token)

    return packageResponse(packDataPromise)
}