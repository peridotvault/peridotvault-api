import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GameBuilds, GameDraft, GameGeneral, GamePreview, MediaItem } from 'src/common/interfaces/game';
import { deepMerge } from 'src/common/utils/game-draft';

@Injectable()
export class GameDraftsService {
    // constructor(
    //     @Inject('SUPABASE_ANON') private readonly anon: SupabaseClient
    // ) { }

    // private asUser(accessToken: string): SupabaseClient {
    //     const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    //         global: { headers: { Authorization: `Bearer ${accessToken}` } },
    //     });
    //     return client;
    // }

    // async getWhole(userAccessToken: string, gameId: string): Promise<GameDraft> {
    //     const sb = this.asUser(userAccessToken);
    //     const { data, error } = await sb
    //         .from('game_drafts')
    //         .select('draft_json')
    //         .eq('game_id', gameId)
    //         .maybeSingle();

    //     if (error) throw new InternalServerErrorException(error.message);
    //     return data?.draft_json ?? {};
    // }

    // async upsertWhole(userAccessToken: string, userId: string, gameId: string, patch: any) {
    //     const sb = this.asUser(userAccessToken);

    //     // ambil current
    //     const current = await this.getWhole(userAccessToken, gameId);
    //     const merged = deepMerge(current, patch);

    //     const { error } = await sb.from('game_drafts')
    //         .upsert({ user_id: userId, game_id: gameId, draft_json: merged })
    //         .select()
    //         .single();

    //     if (error) throw new InternalServerErrorException(error.message);
    //     return merged;
    // }

    // async delete(userAccessToken: string, gameId: string) {
    //     const sb = this.asUser(userAccessToken);
    //     const { data, error } = await sb.from('game_drafts').delete().eq('game_id', gameId).select().single();
    //     if (error) throw new InternalServerErrorException(error.message);
    //     if (!data) throw new NotFoundException('Draft not found');
    //     return { ok: true };
    // }

    // async getGeneral(userToken: string, gameId: string): Promise<GameGeneral> {
    //     const sb = this.asUser(userToken);
    //     const { data, error } = await sb
    //         .from('game_drafts')
    //         .select('name, description, required_age, price, website_url, cover_vertical_image, cover_horizontal_image, banner_image')
    //         .eq('game_id', gameId)
    //         .maybeSingle();

    //     if (error) throw new InternalServerErrorException(error.message);
    //     if (!data) return {}; // belum ada draft

    //     // Ambil categories & tags
    //     const [{ data: cats }, { data: tags }] = await Promise.all([
    //         sb.from('game_draft_categories').select('category_id, categories(name)').eq('game_id', gameId),
    //         sb.from('game_draft_tags').select('tag_id, tags(name)').eq('game_id', gameId),
    //     ]);

    //     return {
    //         name: data.name ?? undefined,
    //         description: data.description ?? undefined,
    //         required_age: data.required_age ?? undefined,
    //         price: data.price ?? undefined,
    //         website: data.website_url ?? undefined,  // mapping kolom -> DTO
    //         cover_vertical_image: data.cover_vertical_image ?? undefined,
    //         cover_horizontal_image: data.cover_horizontal_image ?? undefined,
    //         banner_image: data.banner_image ?? undefined,
    //         categories: (cats ?? []).map((c: any) => c.category_id),
    //         tags: (tags ?? []).map((t: any) => t.tag_id),
    //     };
    // }


    // async setGeneral(userToken: string, userId: string, gameId: string, body: GameGeneral) {
    //     const sb = this.asUser(userToken);

    //     // Upsert baris utama
    //     const updates: any = {
    //         ...(body.name !== undefined && { name: body.name }),
    //         ...(body.description !== undefined && { description: body.description }),
    //         ...(body.required_age !== undefined && { required_age: body.required_age }),
    //         ...(body.price !== undefined && { price: body.price }),
    //         ...(body.website !== undefined && { website_url: body.website }),
    //         ...(body.cover_vertical_image !== undefined && { cover_vertical_image: body.cover_vertical_image }),
    //         ...(body.cover_horizontal_image !== undefined && { cover_horizontal_image: body.cover_horizontal_image }),
    //         ...(body.banner_image !== undefined && { banner_image: body.banner_image }),
    //         updated_at: new Date().toISOString(),
    //     };

    //     // Pastikan draft row ada (dengan owner_id jika pakai RLS)
    //     await sb.from('game_drafts').upsert({
    //         game_id: gameId,
    //         owner_id: userId,                 // penting untuk RLS owner
    //         created_at: new Date().toISOString(),
    //         ...updates,
    //     });

    //     // Sinkronkan categories/tags jika dikirim
    //     if (body.categories) {
    //         // Hapus lama → insert baru (sederhana)
    //         await sb.from('game_draft_categories').delete().eq('game_id', gameId);
    //         if (body.categories.length) {
    //             const rows = body.categories.map((c) => ({ game_id: gameId, category_id: c }));
    //             await sb.from('game_draft_categories').insert(rows);
    //         }
    //     }
    //     if (body.tags) {
    //         await sb.from('game_draft_tags').delete().eq('game_id', gameId);
    //         if (body.tags.length) {
    //             const rows = body.tags.map((t) => ({ game_id: gameId, tag_id: t }));
    //             await sb.from('game_draft_tags').insert(rows);
    //         }
    //     }

    //     return this.getGeneral(userToken, gameId);
    // }

    // async getPreviews(userToken: string, gameId: string): Promise<GamePreview> {
    //     const sb = this.asUser(userToken);
    //     const { data, error } = await sb
    //         .from('game_draft_previews')
    //         .select('id, kind, src, poster, alt, sort_order')
    //         .eq('game_id', gameId)
    //         .order('sort_order', { ascending: true });

    //     if (error) throw new InternalServerErrorException(error.message);
    //     const previews = (data ?? []).map((r: any) => ({
    //         kind: r.kind as 'image' | 'video',
    //         src: r.src,
    //         poster: r.poster ?? undefined,
    //         alt: r.alt ?? undefined,
    //     }));
    //     return { previews };
    // }

    // async setPreviews(userToken: string, gameId: string, body: GamePreview) {
    //     const sb = this.asUser(userToken);
    //     const previews = Array.isArray(body.previews) ? body.previews : [];

    //     // Hapus lama → insert baru (urutannya konsisten)
    //     const del = await sb.from('game_draft_previews').delete().eq('game_id', gameId);
    //     if (del.error) throw new InternalServerErrorException(del.error.message);

    //     const rows = previews.map((p, idx) => ({
    //         game_id: gameId,
    //         kind: p.kind,
    //         src: p.src,
    //         // poster hanya untuk video; untuk image dipaksa null agar schema rapih
    //         poster: p.kind === 'video' ? (p as Extract<MediaItem, { kind: 'video' }>).poster ?? null : null,
    //         alt: p.alt ?? null,
    //         sort_order: idx,
    //         // storage_key: p.storageKey ?? null, // aktifkan jika kolomnya ada
    //     }));

    //     if (rows.length) {
    //         const ins = await sb.from('game_draft_previews').insert(rows);
    //         if (ins.error) throw new InternalServerErrorException(ins.error.message);
    //     }

    //     return this.getPreviews(userToken, gameId);
    // }


    // async getBuilds(userToken: string, gameId: string): Promise<GameBuilds> {
    //     const sb = this.asUser(userToken);
    //     const { data, error } = await sb
    //         .from('game_draft_builds')
    //         .select('distribution')
    //         .eq('game_id', gameId)
    //         .maybeSingle();
    //     if (error) throw new InternalServerErrorException(error.message);
    //     return { distributions: (data?.distribution as any[]) ?? [] };
    // }

    // async setBuilds(userToken: string, gameId: string, distributions: GameBuilds['distributions']) {
    //     const sb = this.asUser(userToken);
    //     await sb.from('game_draft_builds').upsert({
    //         game_id: gameId,
    //         distribution: distributions ?? [],
    //     });
    //     return this.getBuilds(userToken, gameId);
    // }

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
