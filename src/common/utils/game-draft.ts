export function deepMerge(a: any, b: any): any {
    if (Array.isArray(a) && Array.isArray(b)) return b; // untuk array: replace
    if (isObj(a) && isObj(b)) {
        const out: any = { ...a };
        for (const k of Object.keys(b)) out[k] = deepMerge(a?.[k], b[k]);
        return out;
    }
    return b ?? a;
}
function isObj(v: any) { return v && typeof v === 'object' && !Array.isArray(v); }