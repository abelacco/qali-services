import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class CulquiService {
  private readonly apiUrlCulqi = process.env.URI_CULQUI_V2;
  private readonly URI_API_CULQUI = process.env.URI_API_CULQUI;
  // private culqiRsaId = '2ab335ad-c40d-4375-8dad-3ea315de23b0'

  async createToken({ otp, numberPhone, amount }): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrlCulqi}tokens/yape`, {
        otp,
        number_phone: numberPhone,
        amount,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.CULQI_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return error.response?.data || error;
    }
  }
  async createChargeYape(chargeData) {
    console.log('chargeData', this.URI_API_CULQUI);
    try {
      const response = await axios.post(`${this.URI_API_CULQUI}charges`, 
        chargeData, {
        headers: {
          'Authorization': `Bearer ${process.env.CULQI_PRIVATE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.log('error', error.response?.data || error);
      return error.response?.data || error;
    }
  }

  async webhookChargeSucceded(chargeData) {
    console.log('chargeData', chargeData);
    try {
      const response = await axios.post(`${this.URI_API_CULQUI}charges`, 
        chargeData, {
        headers: {
          'Authorization': `Bearer ${process.env.CULQI_PRIVATE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.log('error', error.response?.data || error);
      return error.response?.data || error;
    }
  }
  
  // async sendEncryptedCharge(data: any): Promise<any> {
  //   console.log('data', data);
  //   try {
  //     const response = await axios.post(`${this.apiUrlCulqi}`, data, {
  //       headers: {
  //         'Authorization': `Bearer sk_test_PNT0uC4nCPe17KoI`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('response', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log('error', error.response.data);
  //     return error.response.data;
  //   }
  // }

  // async sendEncryptedToken(encryptedPayload: any): Promise<any> {
  //   const headers = {
  //     'Authorization': `Bearer ${process.env.CULQI_PUBLIC_API_KEY}`, // Reemplaza con tu llave de Culqi
  //     'Content-Type': 'application/json',
  //     'x-culqi-rsa-id': this.culqiRsaId
  //   };

  //   const response = await axios.post(this.apiUrlCulqi, encryptedPayload, { headers });
  //   return response.data;
  // }


}





