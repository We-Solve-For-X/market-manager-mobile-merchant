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
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/load/${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function accept(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/accept/${id}`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function reject(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/reject/${id}`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function activate(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/activate/${id}`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

/** Response:
    Boolean
*/
export async function deactivate(id = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/deactivate/${id}`
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
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/view/${id}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

/** Response:
  Boolean
*/
export async function updatePriceZone(id = '', priceZone = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/priceZones/update/${id}`
    const packDataPromise = post(url, priceZone, token)
    
    return packageResponse(packDataPromise)
}


