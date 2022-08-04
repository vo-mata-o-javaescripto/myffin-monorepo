"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = require("@directus/sdk");
const app_service_1 = require("./app.service");
const directus = new sdk_1.Directus('http://localhost:8055');
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getTicker(ticker, res) {
        try {
            const promises = await Promise.allSettled([
                this.appService.getTicker(ticker),
                this.appService.getCriptoTicker(ticker)
            ]);
            const haveSucess = promises.find(item => item.status === 'fulfilled');
            if (haveSucess === undefined) {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json({ msg: `Ticker not found: ${ticker}` });
            }
            promises.forEach(item => {
                if (item.status === 'fulfilled') {
                    return res.status(common_1.HttpStatus.OK).json(item.value);
                }
            });
        }
        catch (err) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ msg: err.message });
        }
    }
    async doLogin(body, res) {
        try {
            const call = await directus.auth.login({
                email: body.user,
                password: body.pass
            });
            return res.status(common_1.HttpStatus.OK).json(call);
        }
        catch (err) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ msg: err.message });
        }
    }
    async doLoginRefresh(body, res) {
        try {
            const call = await this.appService.refreshToken(body.refreshToken);
            return res.status(common_1.HttpStatus.OK).json(call.data.data);
        }
        catch (err) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ msg: 'deu erro' });
        }
    }
    async doLogout(res) {
        try {
            const call = await this.appService.directusLogout();
            return res.status(common_1.HttpStatus.OK).json(call.data);
        }
        catch (err) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ msg: err.response.data });
        }
    }
};
__decorate([
    (0, common_1.Get)('ticker'),
    __param(0, (0, common_1.Query)('ticker')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTicker", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "doLogin", null);
__decorate([
    (0, common_1.Post)('/login/refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "doLoginRefresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "doLogout", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map