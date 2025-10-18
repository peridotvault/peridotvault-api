export type GameId = string;
export type Timestamp = string;
export type Metadata = Array<[string, Value]>;
export type Tag = string;
export type Category = string;


export type Distribution = { web: WebBuild } | { native: NativeBuild };

export interface WebBuild {
    url: string;
    memory: number;
    graphics: string;
    additionalNotes: string;
    storage: number;
    processor: string;
}

export type StorageRef =
    | { s3: { bucket: string; basePath: string } }
    | { url: { url: string } }
    | { ipfs: { cid: string; path: string } };

export interface Manifest {
    listing: string;
    createdAt: Timestamp;
    size_bytes: number;
    version: string;
    storageRef: StorageRef;
    checksum: string;
}

export type Value =
    | { int: number }
    | { map: Array<[string, Value]> }
    | { nat: number }
    | { array: Array<Value> }
    | { blob: Uint8Array | number[] }
    | { text: string };

export interface NativeBuild {
    os: string;
    memory: number;
    graphics: string;
    additionalNotes: string;
    storage: number;
    manifests: Array<Manifest>;
    processor: string;
    liveVersion?: string;
}

export type MediaItem =
    | { kind: 'image'; src: string; alt?: string; storageKey?: string }
    | {
        kind: 'video';
        src: string;
        poster?: string;
        alt?: string;
        storageKey?: string;
    };

export interface GameDraft {
    game_id?: GameId;
    name?: string;
    description?: string;
    required_age?: number;
    price?: number;
    website?: string;
    banner_image?: string;
    cover_vertical_image?: string;
    cover_horizontal_image?: string;
    is_published?: boolean;
    release_date?: number;
    draft_status?: string;
    created_at?: Timestamp;
    updated_at?: Timestamp;
}

export interface GameGeneral {
    name?: string;
    description?: string;
    required_age?: number;
    price?: number;
    website?: string;
    cover_vertical_image?: string;
    cover_horizontal_image?: string;
    banner_image?: string;
    categories?: Category[];
    tags?: Tag[];
}

export interface GamePreview {
    previews?: MediaItem[]
}

export interface GameBuilds {
    distributions?: Array<Distribution>
}