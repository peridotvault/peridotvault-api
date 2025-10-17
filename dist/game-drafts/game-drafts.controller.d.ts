import { GameDraftsService } from './game-drafts.service';
import * as game from 'src/common/interfaces/game';
export declare class GameDraftsController {
    private readonly service;
    constructor(service: GameDraftsService);
    getWhole(gameId: string): Promise<game.GameDraft>;
    patchWhole(gameId: string, patch: any): Promise<any>;
    remove(gameId: string): Promise<{
        ok: boolean;
    }>;
    getGeneral(gameId: string): Promise<game.GameGeneral>;
    setGeneral(gameId: string, dto: game.GameGeneral): Promise<game.GameGeneral>;
    getPreviews(gameId: string): Promise<game.GamePreview>;
    setPreviews(gameId: string, dto: game.GamePreview): Promise<game.GamePreview>;
    getBuilds(gameId: string): Promise<game.GameBuilds>;
    setBuilds(gameId: string, dto: game.GameBuilds): Promise<game.GameBuilds>;
}
