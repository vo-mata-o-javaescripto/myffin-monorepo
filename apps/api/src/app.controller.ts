import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { Directus } from '@directus/sdk';
import { AppService } from './app.service';
const directus = new Directus('http://localhost:8055');

@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly appService: AppService) {}

  @Get('ticker')
  async getTicker(@Query('ticker') ticker: string, @Res() res: Response) {
    try {
      const promises = await Promise.allSettled([
        this.appService.getTicker(ticker),
        this.appService.getCriptoTicker(ticker)
      ]);

      const haveSucess = promises.find(item => item.status === 'fulfilled');

      if (haveSucess === undefined) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ msg: `Ticker not found: ${ticker}` });
      }

      promises.forEach(item => {
        if (item.status === 'fulfilled') {
          return res.status(HttpStatus.OK).json(item.value);
        }
      });
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message });
    }
  }

  @Post('login')
  async doLogin(
    @Body() body: { user: string; pass: string },
    @Res() res: Response
  ) {
    try {
      const call: any = await directus.auth.login({
        email: body.user,
        password: body.pass
      });
      return res.status(HttpStatus.OK).json(call);
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message });
    }
  }

  @Post('/login/refresh')
  async doLoginRefresh(
    @Body() body: { refreshToken: string },
    @Res() res: Response
  ) {
    try {
      const call: any = await this.appService.refreshToken(body.refreshToken);
      return res.status(HttpStatus.OK).json(call);
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message });
    }
  }

  @Post('logout')
  async doLogout(
    // @Body() body: { refresh_token: string },
    @Res() res: Response
  ) {
    try {
      const call = await this.appService.directusLogout();
      return res.status(HttpStatus.OK).json(call.data);
    } catch (err: any) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: err.response.data });
    }
  }
}
