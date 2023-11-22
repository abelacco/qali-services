import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CulquiService } from './culqui.service';
import { EncryptionService } from './encryption/encryption.service';

@Controller('culqui')
export class CulquiController {
  constructor(
    private readonly culquiService: CulquiService,
    private readonly encryptionService: EncryptionService) {}

  @Post('token/yape')
  async createTokenYape(@Body() userData: any) {
    console.log('userData', userData);
    return this.culquiService.createToken(userData);  
  }

  @Post('charge/yape')
  async createChargeYape(@Body() chargeData: any) {
    return this.culquiService.createChargeYape(chargeData);  
  }

  @Get('webhook/charge/succeded')
  async webhookChargeSucceded(@Body() chargeData: any) {
    this.culquiService.webhookChargeSucceded(chargeData);  
    return { message: 'ok' };
  }

//   @Post('tokens')
// async createToken(@Body() tokenData: any) {
//   const encryptedPayload = this.encryptionService.encryptPayload(tokenData);
//   return this.culquiService.sendEncryptedToken(encryptedPayload);
// }


}
