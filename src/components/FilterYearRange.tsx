import { IYearRange } from "../global.types";
import ToggleButton from "./ToggleButton";
import { ChangeEvent, useState } from "react";

export interface IFilterYearRangeProps {
    onClick?: (isActive: boolean, yearRange: IYearRange) => void;
}

export function FilterYearRange(props: IFilterYearRangeProps) {
    const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
    const [inputYearFrom, setInputYearFrom] = useState<number>(2000);
    const [inputYearTo, setInputYearTo] = useState<number>(new Date().getFullYear() - 1);

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const elementType = event.target.id;
        if (elementType === "year-from") { setInputYearFrom(+event.target.value) }
        else { setInputYearTo(+event.target.value) }
    }

    function handleOnClick() {
        setFilterIsActive(!filterIsActive);
        const yearRange: IYearRange = { fromYear: inputYearFrom, toYear: inputYearTo };
        props.onClick !== undefined && props.onClick(!filterIsActive, yearRange);
    }

    return (
        <>
            <input id="year-from" disabled={filterIsActive} type="number" min="1930" value={inputYearFrom} onChange={handleOnChange} className="inputbox border-1px font-md" />
            to
            <input id="year-to" disabled={filterIsActive} type="number" min="1931" value={inputYearTo} onChange={handleOnChange} className="inputbox border-1px font-md" />
            <ToggleButton onClick={handleOnClick} value="" isActive={filterIsActive}>
                Include
            </ToggleButton>
        </>
    );
}
