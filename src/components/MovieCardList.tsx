import { IMovieCardInfo } from "../global.types";
import MovieCard from "./MovieCard";

export interface IMovieCardListProps {
    cardsInfo: IMovieCardInfo[]
}

export default function MovieCardList(props: IMovieCardListProps) {
    return (
        <>
            {
                props.cardsInfo.length < 1
                    ? <span className="block text-center pt-6 text-4xl opacity-30">Select filters to search Movies</span>
                    : props.cardsInfo.map(info => {
                        return (
                            <MovieCard info={info} />
                        )
                    })
            }
        </>
    );
}
