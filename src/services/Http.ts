import { MD5 } from 'crypto-js';
import axios from 'axios';
import { IHttp } from './Http.interface';
import { BASE_URL, PUK, PVK } from '../utils/constants';

const ts = Date.now();
const hash = MD5(ts + PVK + PUK).toString();

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  apikey: PUK,
  ts,
  hash
};
const areaDataCache:{[key: string]: any} = {};


const queryParamsConstructor = (params: { [key: string]: any; }) => {
  const urlParams = new URLSearchParams();

  for (let key in params) {
    urlParams.append(key, params[key]);
  }

  return urlParams;
};

export default class Http implements IHttp {
  async get<T>(url: string, queryParams: { [key: string]: any }): Promise<T> {
    if (!areaDataCache[`${url}?${queryParamsConstructor(queryParams)}`]){
      areaDataCache[`${url}?${queryParamsConstructor(queryParams)}`] = (await axios.get(`${url}?${queryParamsConstructor(queryParams)}`))
      return axios.get(`${url}?${queryParamsConstructor(queryParams)}`);
    }
    return areaDataCache[`${url}?${queryParamsConstructor(queryParams)}`]
  }
}