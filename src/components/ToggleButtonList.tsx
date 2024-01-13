import { useEffect, useState } from "react";
import { IGenre } from "../global.types";

export interface IToggleButtonListProps {
    items: IGenre[],
    onSelected?: (index: number) => void
    onDeselected?: (index: number) => void
}

export default function ToggleButtonList(props: IToggleButtonListProps) {
    const [activeIds, setActiveIds] = useState<number[]>([]);

    useEffect(() => {
        setActiveIds([]);
    }, [props.items])

    function handleOnClick(id: number) {
        var newActiveIds: number[];
        const indexOfThisId = activeIds.indexOf(id); //-1 if does not exist
        if (indexOfThisId !== -1) {
            newActiveIds = [...activeIds];
            newActiveIds.splice(indexOfThisId, 1);
        } else {
            newActiveIds = [...activeIds, id];
        }
        setActiveIds(newActiveIds);
        if (indexOfThisId !== -1) { //changed to DEselected
            props.onDeselected && props.onDeselected(id);
        } else {
            props.onSelected && props.onSelected(id);
        }
    }

    return (
        <>
            {
                props.items.map((item, index) => {
                    return (
                        <button key={index} role="button" onClick={() => handleOnClick(item.id)} className={`shaped-element hover-behavior font-md ${activeIds.includes(item.id) ? "selected" : ""}`} >
                            {item.name}
                        </button>
                    )
                })
            }
        </>
    );
}
