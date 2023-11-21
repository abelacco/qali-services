import { IsString, MinLength } from 'class-validator';

export class CodeTransactionDto {
  @IsString()
  @MinLength(4)
  codeTransaction: string;
}
