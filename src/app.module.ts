import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameDraftsModule } from './game-drafts/game-drafts.module';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // sesuaikan jika monorepo
    }),
    GameDraftsModule,
    UsersModule,
    SupabaseModule,
    AuthModule,
    GamesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
