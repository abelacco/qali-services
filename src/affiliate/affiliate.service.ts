import { Injectable } from '@nestjs/common';
import {
  CreateAffiliateDto,
  FilterAffiliateDto,
  UpdateAffiliateDto,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Affiliate } from './entities/affiliate.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectModel(Affiliate.name)
    private readonly _affiliate: Model<Affiliate>,
  ) {}

  async create(createAffiliateDto: CreateAffiliateDto): Promise<Affiliate> {
    try {
      return await this._affiliate.create(createAffiliateDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Affiliate[]> {
    const { limit = 20, offset = 0 } = paginationDto;
    return await this._affiliate.find().limit(limit).skip(offset);
  }

  async findOne(term: string): Promise<Affiliate> {
    try {
      let affiliate: Affiliate;
      if (isValidObjectId(term)) {
        affiliate = await this._affiliate.findById(term);
      }
      if (!affiliate) {
        affiliate = await this._affiliate.findOne({ documentId: term });
      }
      if (!affiliate) throw new NotFoundException('affiliate not found');
      return affiliate;
    } catch (error) {
      throw error;
    }
  }

  async filterAffiliate(filterAffiliateDto: FilterAffiliateDto) {
    //todo => filter by fullname, dni and phone
  }

  async update(term: string, updateAffiliateDto: UpdateAffiliateDto) {
    await this.findOne(term);
  }

  remove(id: number) {
    return `This action removes a #${id} affiliate`;
  }
}
