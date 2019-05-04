import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'attendances'

export async function load(merchantId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/${merchantId}`
    const packDataPromise = get(url, token)
    
    return packageResponse(packDataPromise)
}

export async function fetch(attendanceId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${attendanceId}`
    const packDataPromise = get(url, token)
    
    return packageResponse(packDataPromise)
}

export async function submitPayment(invoiceId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/invoices/${invoiceId}/submit`
    const packDataPromise = post(url, {}, token)
    
    return packageResponse(packDataPromise)
}


