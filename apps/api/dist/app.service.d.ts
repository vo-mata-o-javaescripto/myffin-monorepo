import { AxiosResponse } from 'axios';
interface Ticker {
    currency: string;
    price: number;
}
export declare class AppService {
    getTicker(ticker: string): Promise<Ticker>;
    getCriptoTicker(ticker: string): Promise<Ticker>;
    directusLogout(): Promise<AxiosResponse<any>>;
}
export {};
