import { Inject, Injectable  } from '@nestjs/common';
import { DocumentDto } from './dto/get-document.dto';
import axios from 'axios';
import { DOCUMENT_IDENTIFIERS } from 'src/common/constants';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ApiPeruService {
  
  private apiKey: string;
  private urlService: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('peruApiKey');
    this.urlService = this.configService.get<string>('peruUrlService');
  }
  

  async findDocument(document:DocumentDto) {
    const tipo = document.idNumber.length === DOCUMENT_IDENTIFIERS.DNI_LENGTH ? DOCUMENT_IDENTIFIERS.DNI_TYPE : DOCUMENT_IDENTIFIERS.RUC_TYPE;
    const url = `${this.urlService}${tipo}/${document.idNumber}?token=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data

  }


}
