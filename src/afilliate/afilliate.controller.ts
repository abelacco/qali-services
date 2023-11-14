import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AfilliateService } from './afilliate.service';
import { CreateAfilliateDto } from './dto/create-afilliate.dto';
import { UpdateAfilliateDto } from './dto/update-afilliate.dto';

@Controller('afilliate')
export class AfilliateController {
  constructor(private readonly afilliateService: AfilliateService) {}

  @Post()
  create(@Body() createAfilliateDto: CreateAfilliateDto) {
    return this.afilliateService.create(createAfilliateDto);
  }

  @Get()
  findAll() {
    return this.afilliateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.afilliateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAfilliateDto: UpdateAfilliateDto) {
    return this.afilliateService.update(+id, updateAfilliateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.afilliateService.remove(+id);
  }
}
