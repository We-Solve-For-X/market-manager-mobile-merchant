import { get } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

export async function merchantInbox(merchantId = '', hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/messages/merchants/${merchantId}/inbox?hostId=${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}