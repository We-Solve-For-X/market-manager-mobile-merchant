import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

export async function merchantInbox(merchantId = '', hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/messages/merchants/${merchantId}/inbox?hostId=${hostId}`
    console.log(url)
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

// export async function deleteMessage(id = '', token) {
//     //Will be changed to a post soon
//     const url =  MARKMAN_BASE_URL + `/messages/administrator/${id}/delete`
//     const packDataPromise = post(url, {}, token)
    
//     return packageResponse(packDataPromise)
// }
