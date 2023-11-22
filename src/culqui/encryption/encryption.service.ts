import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as forge from 'node-forge';

@Injectable()
export class EncryptionService {
  private publicKeyRSA: string; // Tu clave pública RSA

  constructor() {
    // Cargar tu clave pública RSA
    this.publicKeyRSA = process.env.CULQI_PUBLIC_API_KEY;
  }

  encryptPayload(payloadData: any): any {
    // Generar clave e IV para AES
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // Encriptar los datos con AES-256-GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
    let encrypted = cipher.update(JSON.stringify(payloadData), 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Encriptar la clave e IV de AES con RSA
    const encryptedKey = this.encryptWithRSA(aesKey);
    const encryptedIv = this.encryptWithRSA(iv);

    return {
      encrypted_data: encrypted,
      encrypted_key: encryptedKey,
      encrypted_iv: encryptedIv
    };
  }

  private encryptWithRSA(buffer: Buffer): string {
    // Suponiendo que 'this.publicKeyRSA' es tu clave pública RSA en formato PEM
    const publicKey = forge.pki.publicKeyFromPem(this.publicKeyRSA);
  
    // Convertir el Buffer a un formato que node-forge pueda manejar
    const bufferBytes = forge.util.createBuffer(buffer.toString('binary'));
  
    // Encriptar usando RSA
    const encrypted = publicKey.encrypt(bufferBytes.getBytes(), 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });
  
    // Convertir el resultado encriptado a Base64 para facilitar su manejo
    return forge.util.encode64(encrypted);
  }
}
