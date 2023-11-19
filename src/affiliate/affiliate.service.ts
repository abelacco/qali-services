import { Injectable } from '@nestjs/common';
import {
  CreateAffiliateDto,
  FilterAffiliateDto,
  UpdateAffiliateDto,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Affiliate } from './entities/affiliate.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto';
import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';

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
    const { documentId, fullname, phone } = filterAffiliateDto;
    let affiliates: Affiliate[] | Affiliate;
    try {
      if (documentId) {
        affiliates = await this._affiliate.find({ documentId });
      }
      if (!affiliates && fullname) {
        affiliates = await this._affiliate.find({ fullname });
      }
      if (!affiliates && phone) {
        affiliates = await this._affiliate.findOne({ phone });
      }
      if (!affiliates) throw new NotFoundException('Affiliates not found ');
      return affiliates;
    } catch (error) {
      throw error;
    }
  }

  async update(term: string, updateAffiliateDto: UpdateAffiliateDto) {
    try {
      const findAffiliate: Affiliate = await this.findOne(term);
      await findAffiliate.updateOne(updateAffiliateDto, { new: true });
      await findAffiliate.save();
      return Object.assign(findAffiliate, updateAffiliateDto);
    } catch (error) {
      throw error;
    }
  }

  async toggleIsActive(term: string) {
    try {
      const findAffiliate: Affiliate = await this.findOne(term);
      await findAffiliate.updateOne({ isActive: !findAffiliate.isActive });
      await findAffiliate.save();
      return {
        message: `${
          findAffiliate.fullname
        } #isActive has been updated to ${!findAffiliate.isActive}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    const { deletedCount } = await this._affiliate.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException('error deleting affiliate');
  }
}
