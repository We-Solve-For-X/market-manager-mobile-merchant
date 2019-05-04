import { post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'auth'

export async function signinMerchant(authPost = {}, token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/signin`
    const packDataPromise = post(url, authPost, token)
    
    return packageResponse(packDataPromise)
}

export async function signUpMerchant(signupPost = {}, token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/signup`
    const packDataPromise = post(url, signupPost, token)
    
    return packageResponse(packDataPromise)
}

export async function changePassword(pwUpdate = {}, token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/password/change`
    const packDataPromise = post(url, pwUpdate, token)
    
    return packageResponse(packDataPromise)
}

