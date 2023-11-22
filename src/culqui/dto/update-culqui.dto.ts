import { PartialType } from '@nestjs/swagger';
import { CreateCulquiDto } from './create-culqui.dto';

export class UpdateCulquiDto extends PartialType(CreateCulquiDto) {}
