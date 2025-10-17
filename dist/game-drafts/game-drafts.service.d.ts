import { SupabaseClient } from '@supabase/supabase-js';
import { GameBuilds, GameDraft, GameGeneral, GamePreview } from 'src/common/interfaces/game';
export declare class GameDraftsService {
    private readonly sb;
    constructor(sb: SupabaseClient);
    getWhole(gameId: string): Promise<GameDraft>;
    upsertWhole(gameId: string, patch: any): Promise<any>;
    delete(gameId: string): Promise<{
        ok: boolean;
    }>;
    getGeneral(gameId: string): Promise<GameGeneral>;
    setGeneral(gameId: string, body: GameGeneral): Promise<GameGeneral>;
    getPreviews(gameId: string): Promise<GamePreview>;
    setPreviews(gameId: string, body: GamePreview): Promise<GamePreview>;
    getBuilds(gameId: string): Promise<GameBuilds>;
    setBuilds(gameId: string, distributions: GameBuilds['distributions']): Promise<GameBuilds>;
}
