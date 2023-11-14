import { Module } from '@nestjs/common';
import { AfilliateService } from './afilliate.service';
import { AfilliateController } from './afilliate.controller';

@Module({
  controllers: [AfilliateController],
  providers: [AfilliateService]
})
export class AfilliateModule {}
