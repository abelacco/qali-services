import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, FilterStoreDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common/dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.storeService.findAll(paginationDto);
  }

  @Get('filter')
  filterStores(@Query() filterStoreDto: FilterStoreDto) {
    return this.storeService.filterStore(filterStoreDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.storeService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(term, updateStoreDto);
  }

  @Patch('active/:term')
  toggleIsActiveStore(@Param('term') term: string) {
    return this.storeService.toggleIsActiveStore(term);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.storeService.remove(term);
  }
}
