// This file contains the type definitions 

export type doc = {
    url: string;
    lastmod: string;
    imageurl: string | null;
    title: string;
    summary: string;
    tags: string[] | null;
    score?: number;
    stance: Promise<stance>
}

export type stance = {
    query: string,
    url: string,
    agreementscore: number,
    classification: number
}