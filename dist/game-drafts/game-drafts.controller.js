"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDraftsController = void 0;
const common_1 = require("@nestjs/common");
const game_drafts_service_1 = require("./game-drafts.service");
const game = __importStar(require("../common/interfaces/game"));
let GameDraftsController = class GameDraftsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getWhole(gameId) {
        return this.service.getWhole(gameId);
    }
    patchWhole(gameId, patch) {
        return this.service.upsertWhole(gameId, patch);
    }
    remove(gameId) {
        return this.service.delete(gameId);
    }
    getGeneral(gameId) {
        return this.service.getGeneral(gameId);
    }
    setGeneral(gameId, dto) {
        return this.service.setGeneral(gameId, dto);
    }
    getPreviews(gameId) {
        return this.service.getPreviews(gameId);
    }
    setPreviews(gameId, dto) {
        return this.service.setPreviews(gameId, dto);
    }
    getBuilds(gameId) {
        return this.service.getBuilds(gameId);
    }
    setBuilds(gameId, dto) {
        return this.service.setBuilds(gameId, dto.distributions);
    }
};
exports.GameDraftsController = GameDraftsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "getWhole", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "patchWhole", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('general'),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "getGeneral", null);
__decorate([
    (0, common_1.Post)('general'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "setGeneral", null);
__decorate([
    (0, common_1.Get)('previews'),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "getPreviews", null);
__decorate([
    (0, common_1.Post)('previews'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "setPreviews", null);
__decorate([
    (0, common_1.Get)('builds'),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "getBuilds", null);
__decorate([
    (0, common_1.Post)('builds'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GameDraftsController.prototype, "setBuilds", null);
exports.GameDraftsController = GameDraftsController = __decorate([
    (0, common_1.Controller)('/api/games/:gameId/drafts'),
    __metadata("design:paramtypes", [game_drafts_service_1.GameDraftsService])
], GameDraftsController);
//# sourceMappingURL=game-drafts.controller.js.map