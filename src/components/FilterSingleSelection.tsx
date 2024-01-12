import { useState } from "react";
import { IFilterItem } from "../global.types";

export interface IFilterSingleSelectionProps {
    filterItems: IFilterItem[];
    onClick?: (index: number) => void;
}

export default function FilterSingleSelection(props: IFilterSingleSelectionProps) {
    const [isActiveArray, setIsActiveArray] = useState<boolean[]>(
        //initialize with an array of 1 element true then concats with
        //an array of props's n-1 false elements
        [true].concat(new Array(props.filterItems.length - 1).fill(false))
    );

    function handleOnClick(index: number) {
        var copyArray = new Array(isActiveArray.length).fill(false);
        copyArray[index] = true;
        setIsActiveArray(copyArray);
        props.onClick && props.onClick(index);
    }

    return (
        <>
            {
                isActiveArray.map((item, index) => {
                    return (
                        <button key={index} onClick={() => handleOnClick(index)} className={`shaped-element hover-behavior font-md ${item ? "selected" : ""}`}>
                            {props.filterItems[index].title}
                        </button>
                    )
                })
            }
        </>
    );
}
