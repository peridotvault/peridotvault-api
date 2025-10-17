import { Test, TestingModule } from '@nestjs/testing';
import { GameDraftsController } from './game-drafts.controller';

describe('GameDraftsController', () => {
  let controller: GameDraftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameDraftsController],
    }).compile();

    controller = module.get<GameDraftsController>(GameDraftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
