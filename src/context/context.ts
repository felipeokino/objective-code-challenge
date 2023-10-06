import React, { SetStateAction } from 'react';
import { IHttp } from '../services/Http.interface';

export interface AppContext {
    http: IHttp,
    pageCount: number,
    setPageCount: React.Dispatch<SetStateAction<number>>
}

export const Context: React.Context<AppContext> = React.createContext({} as AppContext);