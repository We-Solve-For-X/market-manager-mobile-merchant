import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

export async function signinAdmin(authPost = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/auth/signinAdmin`
    const packDataPromise = post(url, authPost, token)
    
    return packageResponse(packDataPromise)
}

