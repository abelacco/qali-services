import { Module } from '@nestjs/common';
import { CulquiService } from './culqui.service';
import { CulquiController } from './culqui.controller';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  controllers: [CulquiController],
  providers: [CulquiService, EncryptionService]
})
export class CulquiModule {}
