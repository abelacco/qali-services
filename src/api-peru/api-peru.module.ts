import { Module } from '@nestjs/common';
import { ApiPeruService } from './api-peru.service';
import { ApiPeruController } from './api-peru.controller';
import { EnvConfiguration } from 'src/config/app.config';

@Module({
  controllers: [ApiPeruController],
  providers: [ApiPeruService ],
  imports:[]
  
})
export class ApiPeruModule {}
