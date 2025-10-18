import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CategoriesResponse, TagsResponse } from './interfaces/game';

@Injectable()
export class GamesService {
    constructor(@Inject('SUPABASE_ANON') private readonly sb: SupabaseClient) { }

    async getCategories(): Promise<CategoriesResponse> {
        const { data, error } = await this.sb
            .from('categories')
            .select('category_id, name'); // hanya ambil field yang perlu

        if (error) throw new InternalServerErrorException(error.message);
        return { categories: data || [] };
    }

    async getTags(): Promise<TagsResponse> {
        const { data, error } = await this.sb
            .from('tags')
            .select('tag_id, name');

        if (error) throw new InternalServerErrorException(error.message);
        return { tags: data || [] };
    }
}
