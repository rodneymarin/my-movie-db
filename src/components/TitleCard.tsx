import { ApiParams, ITitleCardData } from "../global.types";

export interface ITitleCardProps {
    titleData: ITitleCardData
}

export default function TitleCard(props: ITitleCardProps) {
    return (
        <div className="movie-card">
            <img className="poster rounded-sm border-1px" alt="" src={ApiParams.imagePath + props.titleData.posterPath} />

            <div className="info">
                <h6 className="release-year font-md normal faded-text">
                    {
                        props.titleData.releaseDate.split("-")[0]
                    }
                </h6>
                <h1 className="movie-title accent-text">{props.titleData.title}</h1>
                <div className="rating shaped-element">
                    <i className="fa-solid fa-star fa-2xs color-selected" />
                    <span className="font-md bold"> {props.titleData.rating.toFixed(1)}</span>
                    <span className="font-md faded-text"> ({props.titleData.votes.toLocaleString("en-US", { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })} votes)</span>
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
                <p>{props.titleData.overview}</p>
            </div>
        </div>
    );
}
