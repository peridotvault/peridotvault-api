"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = deepMerge;
function deepMerge(a, b) {
    if (Array.isArray(a) && Array.isArray(b))
        return b;
    if (isObj(a) && isObj(b)) {
        const out = { ...a };
        for (const k of Object.keys(b))
            out[k] = deepMerge(a?.[k], b[k]);
        return out;
    }
    return b ?? a;
}
function isObj(v) { return v && typeof v === 'object' && !Array.isArray(v); }
//# sourceMappingURL=game-draft.js.map