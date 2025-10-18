import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { GameBuilds, GameDraft, GameGeneral, GamePreview, MediaItem } from './interfaces/game';
import { deepMerge } from './utils/game-draft';

@Injectable()
export class GameDraftsService {
    constructor(@Inject('SUPABASE_ANON') private readonly sb: SupabaseClient) { }

    // ===== WHOLE (versi JSONB lama; hapus jika sudah full-normalized) =====
    async getWhole(gameId: string): Promise<GameDraft> {
        const { data, error } = await this.sb
            .from('game_drafts')
            .select('draft_json')
            .eq('game_id', gameId)
            .maybeSingle();

        if (error) throw new InternalServerErrorException(error.message);
        return data?.draft_json ?? {};
    }

    async upsertWhole(gameId: string, patch: any) {
        const current = await this.getWhole(gameId);
        const merged = deepMerge(current, patch);

        const { error } = await this.sb
            .from('game_drafts')
            .upsert({ game_id: gameId, draft_json: merged })
            .select()
            .single();

        if (error) throw new InternalServerErrorException(error.message);
        return merged;
    }

    async delete(gameId: string) {
        const { data, error } = await this.sb
            .from('game_drafts')
            .delete()
            .eq('game_id', gameId)
            .select()
            .single();

        if (error) throw new InternalServerErrorException(error.message);
        if (!data) throw new NotFoundException('Draft not found');
        return { ok: true };
    }

    // ===== GENERAL (schema normalized) =====
    async getGeneral(gameId: string): Promise<GameGeneral> {
        const { data, error } = await this.sb
            .from('game_drafts')
            .select('name, description, required_age, price, website_url, cover_vertical_image, cover_horizontal_image, banner_image')
            .eq('game_id', gameId)
            .maybeSingle();

        if (error) throw new InternalServerErrorException(error.message);
        if (!data) return {};

        const [{ data: cats }, { data: tags }] = await Promise.all([
            this.sb.from('game_draft_categories').select('category_id').eq('game_id', gameId),
            this.sb.from('game_draft_tags').select('tag_id').eq('game_id', gameId),
        ]);

        return {
            name: data.name ?? undefined,
            description: data.description ?? undefined,
            required_age: data.required_age ?? undefined,
            price: data.price ?? undefined,
            website: data.website_url ?? undefined,
            cover_vertical_image: data.cover_vertical_image ?? undefined,
            cover_horizontal_image: data.cover_horizontal_image ?? undefined,
            banner_image: data.banner_image ?? undefined,
            categories: (cats ?? []).map((c: any) => c.category_id),
            tags: (tags ?? []).map((t: any) => t.tag_id),
        };
    }

    async setGeneral(gameId: string, body: GameGeneral) {
        const updates: any = {
            ...(body.name !== undefined && { name: body.name }),
            ...(body.description !== undefined && { description: body.description }),
            ...(body.required_age !== undefined && { required_age: body.required_age }),
            ...(body.price !== undefined && { price: body.price }),
            ...(body.website !== undefined && { website_url: body.website }),
            ...(body.cover_vertical_image !== undefined && { cover_vertical_image: body.cover_vertical_image }),
            ...(body.cover_horizontal_image !== undefined && { cover_horizontal_image: body.cover_horizontal_image }),
            ...(body.banner_image !== undefined && { banner_image: body.banner_image }),
            updated_at: new Date().toISOString(),
        };

        // upsert baris utama
        {
            const { error } = await this.sb
                .from('game_drafts')
                .upsert({ game_id: gameId, ...updates });
            if (error) throw new InternalServerErrorException(error.message);
        }

        // categories / tags (replace-all jika dikirim)
        if (body.categories) {
            const del = await this.sb.from('game_draft_categories').delete().eq('game_id', gameId);
            if (del.error) throw new InternalServerErrorException(del.error.message);
            if (body.categories.length) {
                const rows = body.categories.map((c) => ({ game_id: gameId, category_id: c }));
                const ins = await this.sb.from('game_draft_categories').insert(rows);
                if (ins.error) throw new InternalServerErrorException(ins.error.message);
            }
        }

        if (body.tags) {
            const del = await this.sb.from('game_draft_tags').delete().eq('game_id', gameId);
            if (del.error) throw new InternalServerErrorException(del.error.message);
            if (body.tags.length) {
                const rows = body.tags.map((t) => ({ game_id: gameId, tag_id: t }));
                const ins = await this.sb.from('game_draft_tags').insert(rows);
                if (ins.error) throw new InternalServerErrorException(ins.error.message);
            }
        }

        return this.getGeneral(gameId);
    }

    // ===== PREVIEWS =====
    async getPreviews(gameId: string): Promise<GamePreview> {
        const { data, error } = await this.sb
            .from('game_draft_previews')
            .select('id, kind, src, poster, alt, sort_order')
            .eq('game_id', gameId)
            .order('sort_order', { ascending: true });

        if (error) throw new InternalServerErrorException(error.message);
        const previews = (data ?? []).map((r: any) => ({
            kind: r.kind as 'image' | 'video',
            src: r.src,
            poster: r.poster ?? undefined,
            alt: r.alt ?? undefined,
        }));
        return { previews };
    }

    async setPreviews(gameId: string, body: GamePreview) {
        const previews = Array.isArray(body.previews) ? body.previews : [];

        const del = await this.sb.from('game_draft_previews').delete().eq('game_id', gameId);
        if (del.error) throw new InternalServerErrorException(del.error.message);

        const rows = previews.map((p, idx) => ({
            game_id: gameId,
            kind: p.kind,
            src: p.src,
            poster: p.kind === 'video' ? (p as Extract<MediaItem, { kind: 'video' }>).poster ?? null : null,
            alt: p.alt ?? null,
            sort_order: idx,
        }));

        if (rows.length) {
            const ins = await this.sb.from('game_draft_previews').insert(rows);
            if (ins.error) throw new InternalServerErrorException(ins.error.message);
        }

        return this.getPreviews(gameId);
    }

    // ===== BUILDS =====
    async getBuilds(gameId: string): Promise<GameBuilds> {
        const { data, error } = await this.sb
            .from('game_draft_builds')
            .select('distribution')
            .eq('game_id', gameId)
            .maybeSingle();

        if (error) throw new InternalServerErrorException(error.message);
        return { distributions: (data?.distribution as any[]) ?? [] };
    }

    async setBuilds(gameId: string, distributions: GameBuilds['distributions']) {
        const { error } = await this.sb
            .from('game_draft_builds')
            .upsert({ game_id: gameId, distribution: distributions ?? [] });

        if (error) throw new InternalServerErrorException(error.message);
        return this.getBuilds(gameId);
    }


}