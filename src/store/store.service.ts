import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto, UpdateStoreDto } from './dto';
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
      this.handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Store[]> {
    const { limit = 20, offset = 0 } = paginationDto;
    return await this.store.find().limit(limit).skip(offset);
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
      this.handleDbExceptions(error);
    }
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }

  private handleDbExceptions(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(
        `store with ${JSON.stringify(error.keyValue)} - already exists`,
      );
    }
    throw new InternalServerErrorException('check server logs!');
  }
}
