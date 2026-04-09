import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBcvRatesDto {
  @ApiProperty({
    description: 'The current exchange rate for USD to VES',
    example: 36.5,
    minimum: 0,
  })
  @IsNumber({}, { message: 'The USD rate must be a number' })
  @IsNotEmpty({ message: 'The USD rate is required' })
  @Min(0)
  usd: number;

  @ApiProperty({
    description: 'The current exchange rate for EUR to VES',
    example: 39.2,
    minimum: 0,
  })
  @IsNumber({}, { message: 'The EUR rate must be a number' })
  @IsNotEmpty({ message: 'The EUR rate is required' })
  @Min(0)
  eur: number;
}
