import { Injectable } from '@nestjs/common';
import { CreateAffiliateDto, UpdateAffiliateDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Affiliate } from './entities/affiliate.entity';
import { Model } from 'mongoose';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectModel(Affiliate.name)
    private readonly _affiliate: Model<Affiliate>,
  ) {}

  async create(createAffiliateDto: CreateAffiliateDto) {
    try {
      return await this._affiliate.create(createAffiliateDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all affiliate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} affiliate`;
  }

  update(id: number, updateAffiliateDto: UpdateAffiliateDto) {
    return `This action updates a #${id} affiliate`;
  }

  remove(id: number) {
    return `This action removes a #${id} affiliate`;
  }
}
