import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SupabaseJwtGuard implements CanActivate {
    private sb;
    constructor(cfg: ConfigService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
