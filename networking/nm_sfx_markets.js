import { get, post, dellete } from '../networking/api'
import { MARKMAN_BASE_URL } from "../config/env"
import { packageResponse } from "../networking/responseProcessor"

const MID_URL = 'markets'

// Create(hostId: String,
//     name: String,
//     description: String,
//     takeNote: String,
//     merchantIds: List[String],
//     setupStart: String,
//     marketStart: String,
//     marketEnd: String) 
export async function createMarket(marketCreate = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/`
    const packDataPromise = post(url, marketCreate, token)
    
    return packageResponse(packDataPromise)
}

//  case class Submit( invoiceId: String,
//                     merchantId: String,
//                     amount: Float,
//                     reference: String,
//                     sourceRef: Option[String],
//                     method: String,
//                     comment: Option[String])
export async function submitPayment(payment = {}, token) {
    //Will be changed to a post soon
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/payment`
    const packDataPromise = post(url, payment, token)
    
    return packageResponse(packDataPromise)
}

// LoadMarkets(nFuture: Int,
//             nPast: Int,
//             markets: List[Market])
export async function load(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)

}

// case class NewMarket(merchants: List[Merchant.Summary])
// case class Summary(id: String,
//                 isActive: Boolean,
//                 repName: String,
//                 repSurname: String,
//                 name: String,
//                 description: String,
//                 standId: Option[String])
export async function loadCreate(hostId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/create/populate/${hostId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

// case class View(market: Market.Summary, 
//                 attendances: List[Attendance.MarketSummary])

// Summary(unCode: String,
//         hostId: String,
//         name: String,
//         description: String,
//         takeNote: String,
//         setupStart: OffsetDateTime,
//         marketStart: OffsetDateTime,
//         marketEnd: OffsetDateTime,
//         standPrices: List[PriceBracket],
//         nAttendances: Int,
//         nInvPayed: Int,
//         nInvOuts: Int,
//         nInvSubm: Int)
// const { unCode, name, description, takeNote, setupStart, marketStart, marketEnd, standPrices, nAttendances, nInvPayed, nInvOuts, nInvSubm: Int  } = market

// Attendance.MarketSummary(standId: String,
//                          merchant: Merchant.Summary,
//                          invoice: Invoice.Summary)


// Merchant.Summary(id: String,
//                  isActive: Boolean,
//                  repName: String,
//                  repSurname: String,
//                  name: String,
//                  description: String,
//                  standId: Option[String])

// Invoice.Summary(id: Option[String],
//                 invoiceType: String, // InvoiceType = [ATTENDANCE, ???]
//                 amount: Float,
//                 refNum: String,
//                 status: String, //PaymentStatus = [Outstanding, InReview, Payed]
//                 payedOn: Option[OffsetDateTime],
//                 method: Option[String], // = [Card, Cash, EFT]
//                 comment: Option[String])


export async function view(marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/details/${marketId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}


// ???
export async function dataMail(marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/dataMail?marketId=${marketId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}


// case class LoadAdd(merchants: List[Merchant.Summary])
export async function loadAdd(hostId = '', marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchants/available/${hostId}/${marketId}`
    const packDataPromise = get(url, token)

    return packageResponse(packDataPromise)
}

// Boolean
export async function addMerchant(marketId = '', merchantId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/merchant/${marketId}/${merchantId}`
    const packDataPromise = post(url, {}, token)

    return packageResponse(packDataPromise)
}

export async function deleteMarket(marketId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/${marketId}`
    const packDataPromise = dellete(url, token)

    return packageResponse(packDataPromise)
}

export async function removeAttendance(attendanceId = '', token) {
    const url =  MARKMAN_BASE_URL + `/${MID_URL}/attendance/${attendanceId}`
    const packDataPromise = dellete(url, token)

    return packageResponse(packDataPromise)
}