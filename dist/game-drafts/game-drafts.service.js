"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDraftsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const game_draft_1 = require("../common/utils/game-draft");
let GameDraftsService = class GameDraftsService {
    sb;
    constructor(sb) {
        this.sb = sb;
    }
    async getWhole(gameId) {
        const { data, error } = await this.sb
            .from('game_drafts')
            .select('draft_json')
            .eq('game_id', gameId)
            .maybeSingle();
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        return data?.draft_json ?? {};
    }
    async upsertWhole(gameId, patch) {
        const current = await this.getWhole(gameId);
        const merged = (0, game_draft_1.deepMerge)(current, patch);
        const { error } = await this.sb
            .from('game_drafts')
            .upsert({ game_id: gameId, draft_json: merged })
            .select()
            .single();
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        return merged;
    }
    async delete(gameId) {
        const { data, error } = await this.sb
            .from('game_drafts')
            .delete()
            .eq('game_id', gameId)
            .select()
            .single();
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        if (!data)
            throw new common_1.NotFoundException('Draft not found');
        return { ok: true };
    }
    async getGeneral(gameId) {
        const { data, error } = await this.sb
            .from('game_drafts')
            .select('name, description, required_age, price, website_url, cover_vertical_image, cover_horizontal_image, banner_image')
            .eq('game_id', gameId)
            .maybeSingle();
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        if (!data)
            return {};
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
            categories: (cats ?? []).map((c) => c.category_id),
            tags: (tags ?? []).map((t) => t.tag_id),
        };
    }
    async setGeneral(gameId, body) {
        const updates = {
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
        {
            const { error } = await this.sb
                .from('game_drafts')
                .upsert({ game_id: gameId, ...updates });
            if (error)
                throw new common_1.InternalServerErrorException(error.message);
        }
        if (body.categories) {
            const del = await this.sb.from('game_draft_categories').delete().eq('game_id', gameId);
            if (del.error)
                throw new common_1.InternalServerErrorException(del.error.message);
            if (body.categories.length) {
                const rows = body.categories.map((c) => ({ game_id: gameId, category_id: c }));
                const ins = await this.sb.from('game_draft_categories').insert(rows);
                if (ins.error)
                    throw new common_1.InternalServerErrorException(ins.error.message);
            }
        }
        if (body.tags) {
            const del = await this.sb.from('game_draft_tags').delete().eq('game_id', gameId);
            if (del.error)
                throw new common_1.InternalServerErrorException(del.error.message);
            if (body.tags.length) {
                const rows = body.tags.map((t) => ({ game_id: gameId, tag_id: t }));
                const ins = await this.sb.from('game_draft_tags').insert(rows);
                if (ins.error)
                    throw new common_1.InternalServerErrorException(ins.error.message);
            }
        }
        return this.getGeneral(gameId);
    }
    async getPreviews(gameId) {
        const { data, error } = await this.sb
            .from('game_draft_previews')
            .select('id, kind, src, poster, alt, sort_order')
            .eq('game_id', gameId)
            .order('sort_order', { ascending: true });
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        const previews = (data ?? []).map((r) => ({
            kind: r.kind,
            src: r.src,
            poster: r.poster ?? undefined,
            alt: r.alt ?? undefined,
        }));
        return { previews };
    }
    async setPreviews(gameId, body) {
        const previews = Array.isArray(body.previews) ? body.previews : [];
        const del = await this.sb.from('game_draft_previews').delete().eq('game_id', gameId);
        if (del.error)
            throw new common_1.InternalServerErrorException(del.error.message);
        const rows = previews.map((p, idx) => ({
            game_id: gameId,
            kind: p.kind,
            src: p.src,
            poster: p.kind === 'video' ? p.poster ?? null : null,
            alt: p.alt ?? null,
            sort_order: idx,
        }));
        if (rows.length) {
            const ins = await this.sb.from('game_draft_previews').insert(rows);
            if (ins.error)
                throw new common_1.InternalServerErrorException(ins.error.message);
        }
        return this.getPreviews(gameId);
    }
    async getBuilds(gameId) {
        const { data, error } = await this.sb
            .from('game_draft_builds')
            .select('distribution')
            .eq('game_id', gameId)
            .maybeSingle();
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        return { distributions: data?.distribution ?? [] };
    }
    async setBuilds(gameId, distributions) {
        const { error } = await this.sb
            .from('game_draft_builds')
            .upsert({ game_id: gameId, distribution: distributions ?? [] });
        if (error)
            throw new common_1.InternalServerErrorException(error.message);
        return this.getBuilds(gameId);
    }
};
exports.GameDraftsService = GameDraftsService;
exports.GameDraftsService = GameDraftsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_ANON')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GameDraftsService);
//# sourceMappingURL=game-drafts.service.js.map