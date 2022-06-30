import { Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getTicker(ticker: string, res: Response): Promise<Response<any, Record<string, any>>>;
    doLogin(body: {
        user: string;
        pass: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    doLogout(res: Response): Promise<Response<any, Record<string, any>>>;
}
