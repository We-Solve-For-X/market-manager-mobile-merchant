import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'auth'

export async function signinMerchant(authPost = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/signin`
    const packDataPromise = post(url, authPost, token)
    
    return packageResponse(packDataPromise)
}

// nPassword(username: String,
//     cPassword: String,
//     nPassword: String)
export async function changePassword(pwUpdate = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/password/change`
    const packDataPromise = post(url, pwUpdate, token)
    
    return packageResponse(packDataPromise)
}

