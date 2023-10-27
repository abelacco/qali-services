import { Injectable } from '@nestjs/common';
import {  v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');
import axios from 'axios';

@Injectable()

export class CloudinaryService {

  async uploadFromURL(imageUrl: string): Promise<CloudinaryResponse> {
    // Descargar la imagen de la URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Subir el buffer a Cloudinary
    return this.uploadToCloudinary(imageBuffer);
  }

  // Puedes mantener tu método 'uploadFile' si todavía lo necesitas
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return this.uploadToCloudinary(file.buffer);
  }

  // Puedes mantener tu método 'uploadFile' si todavía lo necesitas
  async uploadFile2(imageBuffer: Buffer): Promise<CloudinaryResponse> {
    return this.uploadToCloudinary(imageBuffer);
  }

  private uploadToCloudinary(imageBuffer: Buffer): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error: CloudinaryResponse, result: CloudinaryResponse) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(imageBuffer).pipe(stream);
    });
  }



}