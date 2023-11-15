import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto, FilterStoreDto, UpdateStoreDto } from './dto';
import { Store } from './entities/store.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly store: Model<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    try {
      const store: Store = await this.store.create(createStoreDto);
      return store;
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Store[]> {
    const { limit = 20, offset = 0 } = paginationDto;
    return await this.store.find().limit(limit).skip(offset);
  }

  async filterStore(filterStoreDto: FilterStoreDto) {
    try {
      let store: Store[];
      if (filterStoreDto.affiliateId) {
        store = await this.store.find({
          affiliateId: filterStoreDto.affiliateId,
        });
      }
      if (!store && filterStoreDto.documentId) {
        store = await this.store.find({
          documentId: filterStoreDto.documentId,
        });
      }
      if (!store && filterStoreDto.phone) {
        store = await this.store.find({ phone: filterStoreDto.phone });
      }
      if (!store) throw new NotFoundException('Stores not found');
      return store;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(term: string): Promise<Store> | never {
    try {
      let store: Store;
      if (isValidObjectId(term)) {
        store = await this.store.findById(term);
      }
      if (!store) {
        store = await this.store.findOne({ documentId: term });
      }

      if (!store)
        throw new NotFoundException(
          `Store with "_id" or "DNI" ~ ${term} ~ not found!`,
        );
      return store;
    } catch (error) {
      throw error;
    }
  }

  async update(term: string, updateStoreDto: UpdateStoreDto) {
    try {
      const store = await this.findOne(term);
      await store.updateOne(updateStoreDto, { new: true });
      await store.save();
      return Object.assign(store, updateStoreDto);
    } catch (error) {
      throw error;
    }
  }

  async toggleIsActiveStore(term: string) {
    try {
      const store: Store = await this.findOne(term);
      await store.updateOne({ isActive: !store.isActive }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async remove(term: string) {
    try {
      const store = await this.findOne(term);
      await store.deleteOne();
    } catch (error) {
      throw error;
    }
  }
}
