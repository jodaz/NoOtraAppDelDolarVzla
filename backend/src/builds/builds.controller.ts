import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuildsService } from './builds.service';
import { CreateBuildDto } from './dto/create-build.dto';

@Controller('builds')
export class BuildsController {
  constructor(private readonly buildsService: BuildsService) {}

  @Get()
  async getBuilds() {
    return this.buildsService.findAll();
  }

  @Post()
  async createBuild(@Body() createBuildDto: CreateBuildDto) {
    return this.buildsService.create(createBuildDto);
  }
}
