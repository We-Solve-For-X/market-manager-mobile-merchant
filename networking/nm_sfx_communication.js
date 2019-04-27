import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

export async function adminInbox(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/messages/administrator/${hostId}/inbox`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

export async function loadSend(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/messages/administrator/${hostId}/recipients`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

export async function sendMessage(mesg = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/messages/administrator/send`
    const packDataPromise = post(url, mesg, token)
    
    return packageResponse(packDataPromise)
}

export async function deleteMessage(id = '', token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/messages/administrator/${id}/delete`
    const packDataPromise = post(url, {}, token)
    
    return packageResponse(packDataPromise)
}
