import { Test, TestingModule } from '@nestjs/testing';
import { GameDraftsService } from './game-drafts.service';
import { SupabaseClient } from '@supabase/supabase-js';

const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
  upsert: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: null, error: null }),
} as unknown as SupabaseClient;

describe('GameDraftsService', () => {
  let service: GameDraftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameDraftsService,
        {
          provide: 'SUPABASE_ANON', // 👈 Sediakan token yang di-inject
          useValue: mockSupabase,
        },
      ],
    }).compile();

    service = module.get<GameDraftsService>(GameDraftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
