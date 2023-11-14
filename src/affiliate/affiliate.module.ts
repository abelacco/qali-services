import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Affiliate, AffiliateSchema } from './entities/affiliate.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Affiliate.name, schema: AffiliateSchema },
    ]),
  ],
  controllers: [AffiliateController],
  providers: [AffiliateService],
})
export class AffiliateModule {}
