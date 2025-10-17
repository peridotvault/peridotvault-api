import { Module } from '@nestjs/common';
import { GameDraftsController } from './game-drafts.controller';
import { GameDraftsService } from './game-drafts.service';

@Module({
  controllers: [GameDraftsController],
  providers: [GameDraftsService]
})
export class GameDraftsModule {}
