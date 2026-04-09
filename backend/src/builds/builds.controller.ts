import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuildsService } from './builds.service';
import { CreateBuildDto } from './dto/create-build.dto';

@ApiTags('Builds')
@Controller('builds')
export class BuildsController {
  constructor(private readonly buildsService: BuildsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available builds' })
  @ApiResponse({ status: 200, description: 'List of builds retrieved successfully' })
  async getBuilds() {
    return this.buildsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Register a new build' })
  @ApiResponse({ status: 201, description: 'Build registered successfully' })
  async createBuild(@Body() createBuildDto: CreateBuildDto) {
    return this.buildsService.create(createBuildDto);
  }
}
