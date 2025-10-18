import { Test, TestingModule } from '@nestjs/testing';
import { GameDraftsController } from './game-drafts.controller';
import { GameDraftsService } from './game-drafts.service';
// "testt" 

const mockGameDraftsService = {
  getWhole: jest.fn(),
  upsertWhole: jest.fn(),
  delete: jest.fn(),
  getGeneral: jest.fn(),
  setGeneral: jest.fn(),
  getPreviews: jest.fn(),
  setPreviews: jest.fn(),
  getBuilds: jest.fn(),
  setBuilds: jest.fn(),
};

describe('GameDraftsController', () => {
  let controller: GameDraftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameDraftsController],
      providers: [
        {
          provide: GameDraftsService,
          useValue: mockGameDraftsService,
        },
      ],
    }).compile();

    controller = module.get<GameDraftsController>(GameDraftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
