import { PartialType } from '@nestjs/mapped-types';
import { CreateAfilliateDto } from './create-afilliate.dto';

export class UpdateAfilliateDto extends PartialType(CreateAfilliateDto) {}
