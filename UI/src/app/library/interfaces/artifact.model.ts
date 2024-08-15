export interface Artifact {
    id: number;
    artifactName: string;
    slug: string;
    tags: string;
    typeId: number;
    categoryId: number;
    seriesId: number;
    dateAdded: string;
}

export interface ArtifactResponseData {
    items: Artifact[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
}