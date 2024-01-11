
export enum ApiParams {
    baseUrl = "https://api.themoviedb.org/3",
    key = "4cd9930c92d7f7917341a6f0307afdef",
    imagePath = "https://image.tmdb.org/t/p/w500/"
}

export interface IYearRange {
    fromYear: number;
    toYear: number;
}

export interface IFilterItem {
    title: string;
    value: string;
}

export type ApiGenre = {
    id: number;
    name: string;
}

export type ApiGenreResponse = {
    genres: ApiGenre[];
}

export type ApiMovie = {
    genre_ids: number[],
    id: number,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}

export type ApiMovieResponse = {
    page: number,
    results: ApiMovie[]
    total_pages: number,
    total_results: number
}