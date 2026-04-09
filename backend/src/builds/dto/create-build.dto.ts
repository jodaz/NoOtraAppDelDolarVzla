import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildDto {
  @ApiProperty({
    description: 'The version number of the build',
    example: '1.0.0',
  })
  @IsString()
  @IsNotEmpty()
  version: string;

  @ApiProperty({
    description: 'The URL where the build can be downloaded',
    example: 'https://api.akomo.xyz/builds/akomo-1.0.0.apk',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'The target platform for the build',
    example: 'android',
    enum: ['android', 'ios', 'web'],
  })
  @IsString()
  @IsNotEmpty()
  platform: string;
}
