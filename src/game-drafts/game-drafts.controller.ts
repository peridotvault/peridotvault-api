import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('/api/game-drafts')
export class GameDraftsController {

    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Success Set  Cookie');
    }
}
