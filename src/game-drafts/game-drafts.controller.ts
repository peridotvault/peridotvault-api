import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { GameDraftsService } from './game-drafts.service';
import type { GameBuilds, GameGeneral, GamePreview } from './interfaces/game';



@Controller('/api/games/:gameId/drafts')
export class GameDraftsController {
    constructor(private readonly service: GameDraftsService) { }

    @Get()
    getWhole(@Param('gameId') gameId: string) {
        return this.service.getWhole(gameId);
    }

    @Patch()
    patchWhole(@Param('gameId') gameId: string, @Body() patch: any) {
        return this.service.upsertWhole(gameId, patch);
    }

    @Delete()
    remove(@Param('gameId') gameId: string) {
        return this.service.delete(gameId);
    }

    @Get('general')
    getGeneral(@Param('gameId') gameId: string) {
        return this.service.getGeneral(gameId);
    }

    @Post('general')
    setGeneral(@Param('gameId') gameId: string, @Body() dto: GameGeneral) {
        return this.service.setGeneral(gameId, dto);
    }

    @Get('previews')
    getPreviews(@Param('gameId') gameId: string) {
        return this.service.getPreviews(gameId);
    }

    @Post('previews')
    setPreviews(@Param('gameId') gameId: string, @Body() dto: GamePreview) {
        return this.service.setPreviews(gameId, dto);
    }

    @Get('builds')
    getBuilds(@Param('gameId') gameId: string) {
        return this.service.getBuilds(gameId);
    }

    @Post('builds')
    setBuilds(@Param('gameId') gameId: string, @Body() dto: GameBuilds) {
        return this.service.setBuilds(gameId, dto.distributions);
    }
}
