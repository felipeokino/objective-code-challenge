export interface IHttp {
    get<T>(url: string, params?:  { [key: string]: any; }): Promise<T>;
}