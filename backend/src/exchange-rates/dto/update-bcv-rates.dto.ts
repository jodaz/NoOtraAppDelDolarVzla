import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateBcvRatesDto {
  @IsNumber({}, { message: 'The USD rate must be a number' })
  @IsNotEmpty({ message: 'The USD rate is required' })
  usd: number;

  @IsNumber({}, { message: 'The EUR rate must be a number' })
  @IsNotEmpty({ message: 'The EUR rate is required' })
  eur: number;
}
