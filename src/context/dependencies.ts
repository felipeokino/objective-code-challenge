import Http from '../services/Http';
import { IHttp } from '../services/Http.interface';

const http: IHttp = new Http();

export const dependencies = {
    http
}