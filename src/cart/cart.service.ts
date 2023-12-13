import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CartService {
  private messageApi = process.env.WSP_SERVICES_BACKEND;
  
  async getMessageByPagination(props: any) {
    try {
        const queryParams = new URLSearchParams(props).toString();
        const url = `${this.messageApi}/message/paginate?${queryParams}`;
        const response = await axios.get(url);
        return response.data; 
    } catch (error) {
        // Manejar el error adecuadamente
        // Podrías lanzar una excepción personalizada o devolver un valor por defecto
        throw new Error('Error al obtener los mensajes: ' + error.message);
    }                    
}
}
