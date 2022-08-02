"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const yahoo_stock_prices_1 = require("yahoo-stock-prices");
const ccxt = require("ccxt");
const axios_1 = require("axios");
let AppService = class AppService {
    async getTicker(ticker) {
        const data = await (0, yahoo_stock_prices_1.getCurrentData)(ticker);
        return data;
    }
    async getCriptoTicker(ticker) {
        const binance = new ccxt.binance();
        const data = await binance.fetchTicker(ticker);
        return { currency: ticker, price: data.average };
    }
    directusLogout() {
        return axios_1.default.post('http://localhost:8055/auth/logout', {
            refresh_token: 'sdfsdfsdf'
        });
    }
    refreshToken(refreshToken) {
        return axios_1.default.post('http://localhost:8055/auth/refresh', {
            refresh_token: refreshToken
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map