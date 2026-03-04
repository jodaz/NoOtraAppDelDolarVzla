import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBuildDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  platform: string;
}
