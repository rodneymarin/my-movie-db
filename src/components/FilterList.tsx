import { IValueKeyItem, IYearRange } from "../global.types";

export interface IFilerListProps {
    yearRange: IYearRange | null;
    genres: IValueKeyItem[];
    onSearchClick: (yearRange: IYearRange | null, genres: IValueKeyItem[]) => void;
}

export default function FilterList(props: IFilerListProps) {

    function handleClick() {
        document.getElementById("search-result")?.scrollIntoView(true);
        props.onSearchClick(props.yearRange, props.genres);
    }

    return (
        <>
            <h2 className="text-3xl font-bold">Filters</h2>
            <div className="py-4 flex flex-row flex-wrap gap-2">
                <button
                    className="py-2 px-4 text-black dark:text-white bg-yellow-400 hover:bg-yellow-500 dark:bg-indigo-900 rounded font-semibold dark:hover:bg-indigo-800"
                    onClick={handleClick}
                >
                    See results
                </button>
                {
                    props.yearRange &&
                    <div className="border border-gray-400 dark:border-slate-600 border-dashed py-1 px-4 rounded-full">
                        From year {props.yearRange.fromYear} to {props.yearRange.toYear}
                    </div>
                }
                {
                    props.genres.map(genre => {
                        return (
                            <div key={genre.key} className="border border-gray-400 dark:border-slate-600 border-dashed py-1 px-4 rounded-full">
                                {genre.value}
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
