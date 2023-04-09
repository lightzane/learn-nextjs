import { ParsedUrlQuery } from "querystring";

export interface IPost {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
    content: string;
    isFeatured?: boolean;
}

export interface IPostParams extends ParsedUrlQuery, Omit<IPost, 'isFeatured'> { }
