import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseJwtGuard implements CanActivate {
    private sb;
    constructor(cfg: ConfigService) {
        const url = cfg.get<string>('SUPABASE_URL');
        const anon = cfg.get<string>('SUPABASE_ANON_KEY');
        if (!url || !anon) throw new Error('Missing SUPABASE_URL / SUPABASE_ANON_KEY');
        this.sb = createClient(url, anon);
    }

    async canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest<Request>();
        const auth = req.headers['authorization'] ?? req.headers['Authorization'] as string | undefined;
        if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException('Missing Bearer token');
        const token = auth.slice(7);

        // DEBUG sementara – hapus setelah beres
        // console.log('DBG token starts with:', token.substring(0, 12));

        const { data, error } = await this.sb.auth.getUser(token);
        if (error || !data?.user) {
            // console.error('Supabase getUser error:', error);
            throw new UnauthorizedException('Invalid token');
        }
        (req as any).user = data.user;
        (req as any).accessToken = token;
        return true;
    }
}
