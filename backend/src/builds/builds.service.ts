import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBuildDto } from './dto/create-build.dto';

@Injectable()
export class BuildsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('builds')
      .select('url, version, platform')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  }

  async create(createBuildDto: CreateBuildDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('builds')
      .insert([createBuildDto])
      .select();

    if (error) {
      throw error;
    }

    return data[0];
  }
}
