import { get, patch } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'home'

export async function merchOverview(merchantId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/${merchantId}`
    const packDataPromise = get(url, token)
    
    return packageResponse(packDataPromise)
}

export async function updateMerchant(patchBody = {}, merchantId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/${merchantId}`
    const packDataPromise = patch(url, patchBody, token)
    
    return packageResponse(packDataPromise)
}