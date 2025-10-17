import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { GameDraftsService } from './game-drafts.service';
import * as game from 'src/common/interfaces/game';
// import { SupabaseJwtGuard } from 'src/auth/supabase-jwt.guard';

// @UseGuards(SupabaseJwtGuard)
@Controller('/api/games/:gameId/drafts')
export class GameDraftsController {
    // constructor(private readonly service: GameDraftsService) { }

    // @Get()
    // getWhole(@Param('gameId') gameId: string, @Req() req: any) {
    //     return this.service.getWhole(req.accessToken, gameId);
    // }

    // @Patch()
    // patchWhole(@Param('gameId') gameId: string, @Req() req: any, @Body() patch: any) {
    //     return this.service.upsertWhole(req.accessToken, req.user.id, gameId, patch);
    // }

    // @Delete()
    // remove(@Param('gameId') gameId: string, @Req() req: any) {
    //     return this.service.delete(req.accessToken, gameId);
    // }

    // @Get('general')
    // getGeneral(@Param('gameId') gameId: string, @Req() req: any) {
    //     return this.service.getGeneral(req.accessToken, gameId);
    // }
    // @Post('general')
    // setGeneral(@Param('gameId') gameId: string, @Req() req: any, @Body() dto: game.GameGeneral) {
    //     return this.service.setGeneral(req.accessToken, req.user.id, gameId, dto);
    // }

    // @Get('previews')
    // getPreviews(@Param('gameId') gameId: string, @Req() req: any) {
    //     return this.service.getPreviews(req.accessToken, gameId);
    // }
    // @Post('previews')
    // setPreviews(@Param('gameId') gameId: string, @Req() req: any, @Body() dto: game.GamePreview) {
    //     return this.service.setPreviews(req.accessToken, gameId, dto);
    // }

    // @Get('builds')
    // getBuilds(@Param('gameId') gameId: string, @Req() req: any) {
    //     return this.service.getBuilds(req.accessToken, gameId);
    // }
    // @Post('builds')
    // setBuilds(@Param('gameId') gameId: string, @Req() req: any, @Body() dto: game.GameBuilds) {
    //     return this.service.setBuilds(req.accessToken, gameId, dto.distributions);
    // }
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
    setGeneral(@Param('gameId') gameId: string, @Body() dto: game.GameGeneral) {
        return this.service.setGeneral(gameId, dto);
    }

    @Get('previews')
    getPreviews(@Param('gameId') gameId: string) {
        return this.service.getPreviews(gameId);
    }

    @Post('previews')
    setPreviews(@Param('gameId') gameId: string, @Body() dto: game.GamePreview) {
        return this.service.setPreviews(gameId, dto);
    }

    @Get('builds')
    getBuilds(@Param('gameId') gameId: string) {
        return this.service.getBuilds(gameId);
    }

    @Post('builds')
    setBuilds(@Param('gameId') gameId: string, @Body() dto: game.GameBuilds) {
        return this.service.setBuilds(gameId, dto.distributions);
    }
}
