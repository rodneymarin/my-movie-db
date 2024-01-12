import { PropsWithChildren } from "react";

export interface IFilerListProps {
    onClick?: () => void;
}

export default function FilterList(props: PropsWithChildren<IFilerListProps>) {
    return (
        <>
            <h2 className="font-l">Filters</h2>
            <div className="filters wrap-container font-md">
                <button className="button" onClick={props.onClick}>See results</button>
                {
                    props.children
                }
            </div>
        </>
    );
}
