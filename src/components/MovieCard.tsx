import { ApiParams, IMovieCardInfo } from "../global.types";

export interface IMovieCardProps {
    info: IMovieCardInfo
}

export default function MovieCard(props: IMovieCardProps) {
    return (
        <div className="w-full flex flex-row gap-8 py-6">
            <img className="max-w-[30%] h-fit aspect-auto rounded" alt="" src={ApiParams.imagePath + props.info.poster_path} />

            <div className="flex flex-col gap-2">
                <h6 className="text-slate-400">
                    {props.info.release_date.split("-")[0]}
                </h6>
                <h1 className="text-4xl font-bold dark:text-white">{props.info.original_title}</h1>
                <div className="w-fit border border-gray-400 dark:border-slate-600 border-dashed py-1 px-4 rounded-full">
                    <i className="fa-solid fa-star fa-2xs text-yellow-400" />
                    <span className="font-md bold"> {props.info.vote_average.toFixed(1)}</span>
                    <span className="font-md faded-text"> ({props.info.vote_count.toLocaleString("en-US", { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })} votes)</span>
                </div>
                <div>
                    {
                        // props.movieData.genre_ids.map(function (item: number) {
                        //     return (<span>
                        //         {
                        //             props.genreData.find(function())
                        //         }
                        //     </span>
                        //     );
                        // })
                    }
                </div>
                <p>{props.info.overview}</p>
            </div>
        </div>
    );
}
