import { PropsWithChildren } from "react";

export interface IFilerListProps {
    filterListEmpty: boolean;
    onClick?: () => void;
}

export default function FilterList(props: PropsWithChildren<IFilerListProps>) {
    return (
        <>
            <h2 className="font-l">Filters</h2>
            <div className="filters wrap-container font-md">
                <button className="button" disabled={props.filterListEmpty} onClick={props.onClick}>See results</button>
                {
                    props.filterListEmpty
                        ? <span className="faded-text">Select options below to start filtering</span>
                        : props.children
                }
            </div>
        </>
    );
}
