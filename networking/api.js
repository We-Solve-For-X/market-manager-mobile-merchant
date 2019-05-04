import { isProd } from '../config/env'
import axios from 'axios'

const BASE_URL = isProd ? 'https://sfx-api-markman-prod.herokuapp.com' : 'http://localhost:8192'

export function get(path, token) {
  //console.log('url', `${BASE_URL}/${path}`)
  return axios.get(`${BASE_URL}/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    },
    timeout: 9000,
    cancelToken: token
  })
}

export function post(path, body, token) {
  // console.log('[POST] ', `${BASE_URL}/${path}`)
  // console.log('[POST] ', body)
  return axios.post(`${BASE_URL}/${path}`, body, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
    timeout: 9000,
    cancelToken: token,
  })
}

export function patch(path, body, token) {
  // console.log('[POST] ', `${BASE_URL}/${path}`)
  // console.log('[POST] ', body)
  return axios.patch(`${BASE_URL}/${path}`, body, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
    timeout: 9000,
    cancelToken: token,
  })
}

export function dellete(path, token) {
  //console.log('url', `${BASE_URL}/${path}`)
  return axios.delete(`${BASE_URL}/${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    },
    timeout: 9000,
    cancelToken: token
  })
}