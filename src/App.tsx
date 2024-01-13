import { Sidebar } from "./components/Sidebar"
import { useEffect, useState } from "react";
import AccordionItem from "./components/AccordionItem";
import FilterList from "./components/FilterList";
import { IYearRange, IFilterItem, ApiGenreResponse, IGenre, ApiParams, ApiMovieTitle, ApiTvTitle, ApiTitleResponse, ITitleCardData } from "./global.types";
import { FilterYearRange } from "./components/FilterYearRange";
import FilterSingleSelection from "./components/FilterSingleSelection";
import axios from "axios";
import TitleCard from "./components/TitleCard";
import ToggleButtonList from "./components/ToggleButtonList";
import ThemeSwitch from "./components/ThemeSwitch";

enum ETitleOption {
	movie = "movie",
	tv = "tv"
}

function App() {
	const filterTitleType: IFilterItem[] = [{ value: "movie", title: "Movie" }, { value: "tv", title: "TV Series" }];
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [filterMediaType, setFilterMediaType] = useState<IFilterItem>(filterTitleType[0]);
	const [filterReleaseYear, setFilterReleaseYear] = useState<IFilterItem[]>([]);
	const [filterGenres, setFilterGenres] = useState<IFilterItem[]>([]);
	//Genres from api
	const [movieGenres, setMovieGenres] = useState<IGenre[]>([]);
	const [tvGenres, setTvGenres] = useState<IGenre[]>([]);
	//titles from api
	var movieTitles: ApiMovieTitle[] = [];
	var tvTitles: ApiTvTitle[] = [];
	//Title state for ui cards
	const [titlesOnScreen, setTitlesOnScreen] = useState<ITitleCardData[]>([]);

	//get Genres from API
	useEffect(() => {
		const urlMovie: string = ApiParams.baseUrl + "/genre/movie/list";
		const urlTv: string = ApiParams.baseUrl + "/genre/tv/list";
		axios.get(urlMovie, { params: { api_key: ApiParams.key } })
			.then((response) => {
				//cast response.data type
				setMovieGenres([...(response.data as ApiGenreResponse).genres]);
			});
		axios.get(urlTv, { params: { api_key: ApiParams.key } })
			.then((response) => {
				//cast response.data type
				setTvGenres([...(response.data as ApiGenreResponse).genres]);
			});

	}, []);

	function buildApiStringFilters(): string {
		var callString: string = "/discover/" + filterMediaType.value + "?include_adult=false&sort_by=vote_count.desc&language=en-US&page=1&vote_count.gte=100";
		if (filterGenres.length > 0) {
			callString += "&with_genres=" + filterGenres.reduce<string>(function (result: string, item: IFilterItem) {
				return result + (result === "" ? "" : ",") + item.value;
			}, "");
		}
		if (filterReleaseYear.length > 0) {
			callString += "&primary_release_date.gte=" + filterReleaseYear[0].value + "-01-01" +
				"&primary_release_date.lte=" + filterReleaseYear[1].value + "-12-31";
		}

		return callString;
	}

	function fillTitlesForScreen() {
		var newScreenTitles: ITitleCardData[] = [];
		if (filterMediaType.value == ETitleOption.movie) {
			movieTitles.map(item => {
				newScreenTitles.push({
					id: item.id,
					title: item.original_title,
					votes: item.vote_count,
					rating: item.vote_average,
					posterPath: item.poster_path,
					releaseDate: item.release_date,
					overview: item.overview
				})
			});
		} else {
			tvTitles.map(item => {
				newScreenTitles.push({
					id: item.id,
					title: item.name,
					votes: item.vote_count,
					rating: item.vote_average,
					posterPath: item.poster_path,
					releaseDate: item.first_air_date,
					overview: item.overview
				})
			});
		}
		console.log(newScreenTitles);
		setTitlesOnScreen(newScreenTitles);
	}

	function getTitlesFromApi() {
		const url: string = (ApiParams.baseUrl + buildApiStringFilters()).toLowerCase();
		axios.get(url, { params: { api_key: ApiParams.key } })
			.then((response) => {
				//cast response.data type
				if (filterMediaType.value == ETitleOption.movie) {
					//setMovieTitles((response.data as ApiTitleResponse).results as ApiMovieTitle[]);
					movieTitles = (response.data as ApiTitleResponse).results as ApiMovieTitle[];
				} else {
					//setTvTitles((response.data as ApiTitleResponse).results as ApiTvTitle[]);
					tvTitles = (response.data as ApiTitleResponse).results as ApiTvTitle[];
				}
				fillTitlesForScreen();
			})
	}

	function handleResultOnClick() {
		setTitlesOnScreen([]);
		getTitlesFromApi();
	}

	function handleYearRangeOnClick(isActive: boolean, yearRange: IYearRange) {
		var newFilter: IFilterItem[] = [];
		newFilter =
			isActive ?
				[
					{ title: yearRange.fromYear.toString(), value: yearRange.fromYear.toString() },
					{ title: yearRange.toYear.toString(), value: yearRange.toYear.toString() }
				]
				: [];
		setFilterReleaseYear(newFilter);
	}

	function handleMediaTypeOnClick(index: number) {
		setFilterMediaType(filterTitleType[index]);
		setFilterGenres([]);
		setTitlesOnScreen([]);
	}

	function handleOnSelectedGenre(id: number) {
		const thisGenre: IGenre =
			filterMediaType.value == ETitleOption.movie ?
				movieGenres.find(item => item.id === id) as IGenre
				:
				tvGenres.find(item => item.id === id) as IGenre;
		setFilterGenres([...filterGenres,
		{
			title: thisGenre.name,
			value: thisGenre.id.toString()
		}
		]);
	}

	function handleOnDeselectedGenre(id: number) {
		const currentGenre: IGenre =
			filterMediaType.value == ETitleOption.movie ?
				movieGenres.find(item => item.id === id) as IGenre
				:
				tvGenres.find(item => item.id === id) as IGenre;
		const currentFilter = [...filterGenres].filter(item => item.value != currentGenre.id.toString());
		setFilterGenres(currentFilter);
	}

	function themeSwitch() {
		setDarkMode(!darkMode);
		console.log(darkMode);
	}

	return (
		<div id="App" data-theme={`${darkMode ? "dark" : ""}`}>
			<div className="app-container">
				<header className="header">
					<h1 className="font-xl accent-text">My Movie Database</h1>
					<ThemeSwitch onClick={themeSwitch} />
				</header>
				<main>
					<FilterList onClick={handleResultOnClick}>
						<div className="shaped-element">
							{filterMediaType.title}
						</div>
						{
							filterReleaseYear.length > 0 &&
							< div className="shaped-element">
								From year {filterReleaseYear[0].title} to {filterReleaseYear[1].title}
							</div>
						}
						{
							filterGenres.map(item => {
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
								<AccordionItem title="Media Type">
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
								<AccordionItem title="Genre">
									<div className="wrap-container">
										{
											<ToggleButtonList
												items={filterMediaType.value == ETitleOption.movie ? movieGenres : tvGenres}
												onSelected={handleOnSelectedGenre}
												onDeselected={handleOnDeselectedGenre}
											/>
										}
									</div>
								</AccordionItem>
								<AccordionItem title="Release year">
									<div className="fill-container release-year-container">
										<FilterYearRange onClick={handleYearRangeOnClick} />
									</div>
								</AccordionItem>
							</Sidebar>
						</div>
						<div id="search-result" className="border-1px rounded-sm">
							{
								titlesOnScreen.length < 1
									? <span className="empty-msg">Select filters to search titles</span>
									: titlesOnScreen.map(item => {
										return (
											<TitleCard key={item.id} titleData={item} />
										)
									})
							}
						</div>
					</div>
				</main>
			</div>
		</div >
	)
}

export default App
