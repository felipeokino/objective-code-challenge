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

const queryParamsConstructor = (params: { [key: string]: any; }) => {
  const urlParams = new URLSearchParams();

  for (let key in params) {
    urlParams.append(key, params[key]);
  }

  return urlParams;
};

export default class Http implements IHttp {
  get<T>(url: string, queryParams: { [key: string]: any }): Promise<T> {
    return axios.get(`${url}?${queryParamsConstructor(queryParams)}`);
  }
}