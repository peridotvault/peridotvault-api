export interface Category {
    category_id: string;
    name: string;
}

export interface Tag {
    tag_id: string;
    name: string;
}

export interface CategoriesResponse {
    categories: Category[];
}

export interface TagsResponse {
    tags: Tag[];
}