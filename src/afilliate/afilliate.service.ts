import { Injectable } from '@nestjs/common';
import { CreateAfilliateDto } from './dto/create-afilliate.dto';
import { UpdateAfilliateDto } from './dto/update-afilliate.dto';

@Injectable()
export class AfilliateService {
  create(createAfilliateDto: CreateAfilliateDto) {
    return 'This action adds a new afilliate';
  }

  findAll() {
    return `This action returns all afilliate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} afilliate`;
  }

  update(id: number, updateAfilliateDto: UpdateAfilliateDto) {
    return `This action updates a #${id} afilliate`;
  }

  remove(id: number) {
    return `This action removes a #${id} afilliate`;
  }
}
