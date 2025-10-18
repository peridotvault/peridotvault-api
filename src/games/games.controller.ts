import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('/api/games')
export class GamesController {
    constructor(private readonly service: GamesService) { }

    @Get('categories')
    getCategories() {
        return this.service.getCategories();
    }

    @Get('tags')
    getTags() {
        return this.service.getTags();
    }
}
