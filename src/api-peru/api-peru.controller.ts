import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiPeruService } from './api-peru.service';
import { DocumentDto } from './dto/get-document.dto';


@Controller('apiperu')
export class ApiPeruController {
  constructor(private readonly apiPeruService: ApiPeruService) {}


  @Get()
  findDocument(@Query() document: DocumentDto) {
    console.log(document)
    return this.apiPeruService.findDocument(document);
  }


}
