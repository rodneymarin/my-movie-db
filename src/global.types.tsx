
export abstract class ApiParams {
    public static baseUrl: string = "https://api.themoviedb.org/3"
    public static moviesUrl: string = "/discover/movie?include_adult=false&sort_by=vote_count.desc&language=en-US&page=1&vote_count.gte=100"
    public static genresUrl: string = "/genre/movie/list"
    public static key: string = "4cd9930c92d7f7917341a6f0307afdef"
    public static imagePath: string = "https://image.tmdb.org/t/p/w500/"

    public static moviesString(): string {
        return this.baseUrl + this.moviesUrl
    }

    public static genreString(): string {
        return this.baseUrl + this.genresUrl;
    }
}

export interface IYearRange {
    fromYear: number;
    toYear: number;
}

export interface IValueKeyItem {
    key: number;
    value: string;
}

export type ApiGenreResponse = {
    genres: { id: number, name: string }[];
}

export type IMovieCardInfo = {
    genre_ids: number[],
    id: number,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number
}

export type ApiMovieResponse = {
    page: number,
    results: IMovieCardInfo[],
    total_pages: number,
    total_results: number
}

// export type IMovieCardInfo = {
//     title: string;
//     votes: number;
//     rating: number;
//     posterPath: string;
//     releaseDate: string;
//     overview: string;
//     id: number;
// }