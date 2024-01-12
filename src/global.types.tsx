
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

export type IGenre = {
    id: number;
    name: string;
}

export type ApiGenreResponse = {
    genres: IGenre[];
}

export type ApiMovieTitle = {
    genre_ids: number[],
    id: number,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number
}

export type ApiTvTitle = {
    genre_ids: number[],
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    first_air_date: string,
    vote_average: number,
    vote_count: number
}

export type ApiTitleResponse = {
    page: number,
    results: ApiTvTitle[] | ApiMovieTitle[],
    total_pages: number,
    total_results: number
}

export type ITitleCardData = {
    title: string;
    votes: number;
    rating: number;
    posterPath: string;
    releaseDate: string;
    overview: string;
    id: number;
}