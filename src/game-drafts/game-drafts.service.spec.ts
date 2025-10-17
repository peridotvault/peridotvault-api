import { Test, TestingModule } from '@nestjs/testing';
import { GameDraftsService } from './game-drafts.service';

describe('GameDraftsService', () => {
  let service: GameDraftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameDraftsService],
    }).compile();

    service = module.get<GameDraftsService>(GameDraftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
