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
import { AffiliateService } from './affiliate.service';
import {
  CreateAffiliateDto,
  FilterAffiliateDto,
  UpdateAffiliateDto,
} from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('affiliate')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Post()
  create(@Body() createAffiliateDto: CreateAffiliateDto) {
    return this.affiliateService.create(createAffiliateDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.affiliateService.findAll(paginationDto);
  }

  @Get('filter')
  filterAffiliate(@Query() filterAffiliateDto: FilterAffiliateDto) {
    return this.affiliateService.filterAffiliate(filterAffiliateDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.affiliateService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateAffiliateDto: UpdateAffiliateDto,
  ) {
    return this.affiliateService.update(term, updateAffiliateDto);
  }

  @Patch('active/:term')
  toggleIsAtiveAffiliate(@Param('term') term: string) {
    return this.affiliateService.toggleIsActive(term);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.affiliateService.remove(id);
  }
}
