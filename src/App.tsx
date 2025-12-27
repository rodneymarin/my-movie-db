import { useEffect, useState } from "react";
import { IValueKeyItem, ApiGenreResponse, ApiParams, IMovieCardInfo, IYearRange, ApiMovieResponse } from "./global.types";
import axios from "axios";
import ThemeSwitch from "./components/ThemeSwitch";
import Layout from "./components/Layout";
import MovieCardList from "./components/MovieCardList";

function App() {
	const [genres, setGenres] = useState<IValueKeyItem[]>([]);
	const [movies, setMovies] = useState<IMovieCardInfo[]>([]);

	//get Genres from API
	useEffect(() => {
		const urlMovie: string = ApiParams.genreString(); //ApiParams.baseUrl + "/genre/movie/list";
		axios.get(urlMovie, { params: { api_key: ApiParams.key } })
			.then((response) => {
				//cast response.data type
				const apiGenres: ApiGenreResponse = response.data;
				setGenres(apiGenres.genres.map(genre => { return { key: genre.id, value: genre.name }; }));
			});
	}, []);

	function getMoviesFromApi(yearRange: IYearRange | null, genres: IValueKeyItem[]) {
		//function buildApiString(): string {
		var callString: string = ApiParams.moviesString(); //"/discover/movie?include_adult=false&sort_by=vote_count.desc&language=en-US&page=1&vote_count.gte=100";
		if (genres.length > 0) {
			callString += "&with_genres=" + genres.reduce<string>(function (result: string, item: IValueKeyItem) {
				return result + (result === "" ? "" : ",") + item.key;
			}, "");
		}

		if (yearRange !== null) {
			callString += "&primary_release_date.gte=" + yearRange.fromYear + "-01-01" +
				"&primary_release_date.lte=" + yearRange.toYear + "-12-31";
		}
		//}

		//const url: string = buildApiString().toLowerCase();
		axios.get(callString, { params: { api_key: ApiParams.key } })
			.then((response) => {
				setMovies((response.data as ApiMovieResponse).results as IMovieCardInfo[]);
			});
	}

	return (
		<div id="App" className="w-full px-4">
			<div className="container max-w-[1200px] mx-auto flex flex-col py-16">
				<header className="w-full py-4 flex flex-row justify-between align-middle">
					<h1 className="text-5xl font-bold dark:text-white">My Movie Database</h1>
					<ThemeSwitch />
				</header>
				<main>
					<Layout onSearchClick={getMoviesFromApi} genres={genres}>
						<MovieCardList cardsInfo={movies} />
					</Layout>
				</main>
			</div>
		</div >
	);
}

export default App;
