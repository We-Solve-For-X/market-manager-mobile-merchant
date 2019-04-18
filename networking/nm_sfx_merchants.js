import { get, post } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'merchants'

/** Response:
    LoadMerchants  (nPending: Int,
                    nApproved: Int,
                    pending: List[Merchant],
                    approved: List[Merchant])
*/
export async function load(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/host/${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function accept(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${id}/accept`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function reject(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${id}/reject`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function activate(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${id}/activate`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function deactivate(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${id}/deactivate`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
   Merchant(hostId: String,
            authId: String,
            status: String, //﻿MerchStatus
            isActive: Boolean,
            repName: String,
            repSurname: String,
            repEmail: String,
            repCell: String,
            name: String,
            legalName: Option[String],
            description: String,
            category: Option[String],
            standId: Option[String],
            priceBracket: PriceBracket,
            createdAt: Option[OffsetDateTime] = Some(OffsetDateTime.now()),
            updatedAt: Option[OffsetDateTime] = Some(OffsetDateTime.now()),
            deleted: Boolean = false,
            id: Option[String] = Some(UUID.randomUUID().toString))
*/
export async function getMerch(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${id}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

/** Response:
  Boolean
*/
export async function updatePriceZone(id = '', priceZone = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${id}/priceZone/update`
    const packDataPromise = post(url, priceZone, token)
    
    return packageResponse(packDataPromise)
}


