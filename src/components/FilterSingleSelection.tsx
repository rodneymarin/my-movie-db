import { useState } from "react";
import { IFilterItem } from "../global.types";

export interface IFilterSingleSelectionProps {
    filterItems: IFilterItem[];
    onClick?: (isActive: boolean, item: IFilterItem) => void;
}

export default function FilterSingleSelection(props: IFilterSingleSelectionProps) {
    const [isActiveArray, setIsActiveArray] = useState<boolean[]>(new Array(props.filterItems.length).fill(false));

    function handleOnClick(index: number) {
        var copyArray = new Array(isActiveArray.length).fill(false);
        const activeIndex: number = isActiveArray.findIndex((i) => i);
        if (index != activeIndex) {
            copyArray[index] = true;
        }
        setIsActiveArray(copyArray);
        if (index != activeIndex) {
            props.onClick && props.onClick(true, props.filterItems[index]);
        } else {
            props.onClick && props.onClick(false, props.filterItems[index]);
        }

    }

    return (
        <>
            {
                isActiveArray.map((item, index) => {
                    return (
                        <button onClick={() => handleOnClick(index)} className={`shaped-element hover-behavior font-md ${item ? "selected" : ""}`}>
                            {props.filterItems[index].title}
                        </button>
                    )
                })
            }
        </>
    );
}
