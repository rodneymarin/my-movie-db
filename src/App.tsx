import { Sidebar } from "./components/Sidebar"
import { useEffect, useState } from "react";
import AccordionItem from "./components/AccordionItem";
import ToggleButton from "./components/ToggleButton";
import FilterList from "./components/FilterList";
import { IYearRange, IFilterItem, ApiGenreResponse, ApiGenre, ApiParams, ApiMovie, ApiMovieResponse } from "./global.types";
import { FilterYearRange } from "./components/FilterYearRange";
import FilterSingleSelection from "./components/FilterSingleSelection";
import ToggleSwitch from "./components/ToggleSwitch";
import axios from "axios";

interface IFilters {
	mediaType: IFilterItem[];
	releaseYear: IFilterItem[];
	genres: IFilterItem[];
}

function App() {
	//Filter options selected for api call
	const [filters, setFilters] = useState<IFilters>({
		mediaType: [],
		releaseYear: [],
		genres: []
	});
	//Genres from api
	const [genres, setGenres] = useState<ApiGenre[]>([]);
	//Movies from api
	const [movies, setMovies] = useState<ApiMovie[]>([]);

	useEffect(() => {
		const url: string = ApiParams.baseUrl + "/genre/movie/list";
		axios.get(url, { params: { api_key: ApiParams.key } })
			.then((response) => {
				//cast response.data type
				setGenres((response.data as ApiGenreResponse).genres);
			})
	}, []);

	function getApiCallFilter(): string {
		var callString: string = "/discover/" + filters.mediaType[0].value + "?include_adult=false&include_video=false&language=en-US&page=1";
		if (filters.genres.length > 0) {
			callString += "&with_genres=" + filters.genres.reduce<string>(function (result: string, item: IFilterItem) {
				return result + (result === "" ? "" : ",") + item.value;
			}, "");
		}
		if (filters.releaseYear.length > 0) {
			callString += "&release_date.gte=" + filters.releaseYear[0].value + "-01-01"
			"&release_date.lte=" + filters.releaseYear[1].value + "-12-31";
		}

		return callString;
	}

	function getMovies() {
		const url: string = (ApiParams.baseUrl + getApiCallFilter()).toLowerCase();
		axios.get(url, { params: { api_key: ApiParams.key } })
			.then((response) => {
				//cast response.data type
				setMovies((response.data as ApiMovieResponse).results);
			});
	}

	function handleYearRangeOnClick(isActive: boolean, yearRange: IYearRange) {
		var currentFilters: IFilters = { ...filters };
		currentFilters.releaseYear =
			isActive ?
				[
					{ title: yearRange.fromYear.toString(), value: yearRange.fromYear.toString() },
					{ title: yearRange.toYear.toString(), value: yearRange.toYear.toString() }
				]
				: [];
		setFilters(currentFilters);
	}

	function handleMediaTypeOnClick(isActive: boolean, item: IFilterItem) {
		var currentFilters: IFilters = { ...filters };
		var newMediaType: IFilterItem[] = [];
		if (isActive) newMediaType.push(item);
		currentFilters.mediaType = newMediaType;
		setFilters(currentFilters);
	}

	function handleGenreOnClick(isActive: boolean, id: string) {
		var currentFilters: IFilters = { ...filters };
		const currentGenre: ApiGenre = genres.find(item => item.id === +id) as ApiGenre;
		if (isActive) {
			currentFilters.genres.push(
				{
					title: currentGenre.name,
					value: currentGenre.id.toString()
				});
		} else {
			const newGenres: IFilterItem[] = [...currentFilters.genres];
			currentFilters.genres = newGenres.filter(item => item.value != currentGenre.id.toString());

		}
		setFilters(currentFilters);
	}

	function areFiltersEmpty(): boolean {
		return filters.mediaType.length == 0 && filters.releaseYear.length == 0 && filters.genres.length == 0;
	}

	return (
		<div id="App">
			<div className="app-container">
				<header className="header">
					<h1 className="font-xl">My Movie Database</h1>
					<ToggleSwitch />
				</header>
				<main>
					<FilterList onClick={getMovies} filterListEmpty={areFiltersEmpty()}>
						{
							filters.mediaType.map(item => {
								return (
									<div className="shaped-element">
										{item.title}
									</div>
								)

							})
						}
						{
							filters.releaseYear.length > 0 &&
							< div className="shaped-element">
								From year {filters.releaseYear[0].title} to {filters.releaseYear[1].title}
							</div>
						}
						{
							filters.genres.map(item => {
								return (
									<div className="shaped-element">
										{item.title}
									</div>
								)
							})
						}
					</FilterList>
					<div className="main-grid">
						<div className="border-1px rounded-sm">
							<Sidebar>
								<AccordionItem title="Media Type" isFirstChild={true}>
									<div className="wrap-container">
										<FilterSingleSelection filterItems={
											[
												{ title: "Movie", value: "Movie" },
												{ title: "TV Series", value: "TV" }
											]}
											onClick={handleMediaTypeOnClick}
										/>
									</div>
								</AccordionItem>
								<AccordionItem title="Release year">
									<div className="fill-container release-year-container">
										<FilterYearRange onClick={handleYearRangeOnClick} />
									</div>
								</AccordionItem>
								<AccordionItem title="Genre">
									<div className="wrap-container">
										{
											genres.map(item => {
												return (
													<ToggleButton onClick={handleGenreOnClick} id={item.id.toString()} initialIsActive={false}>
														{item.name}
													</ToggleButton>
												)
											})
										}
									</div>
								</AccordionItem>
							</Sidebar>
						</div>
						<div id="search-result" className="border-1px rounded-sm"></div>
					</div>
				</main>
			</div>
		</div >
	)
}

export default App
