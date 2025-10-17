import { Module } from '@nestjs/common';
import { GameDraftsController } from './game-drafts.controller';

@Module({
  controllers: [GameDraftsController]
})
export class GameDraftsModule {}
