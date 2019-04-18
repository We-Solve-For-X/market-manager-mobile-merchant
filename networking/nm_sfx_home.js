import { get, post, patch } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'home'

export async function overview(hostId = '', administratorId = '', token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${hostId}/administrator/${administratorId}`
    const packDataPromise = get(url, token)
    
    return packageResponse(packDataPromise)
}

export async function updateAdministrator(patchBody = {}, administratorId = '', token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/administrator/${administratorId}`
    const packDataPromise = patch(url, patchBody, token)
    
    return packageResponse(packDataPromise)
}



