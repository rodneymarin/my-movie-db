import { IYearRange } from "../global.types";
import { ChangeEvent, useState } from "react";

export interface IYearRangeProps {
	onClick?: (yearRange: IYearRange | null) => void;
}

export function YearRange(props: IYearRangeProps) {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [inputYearFrom, setInputYearFrom] = useState<number>(2000);
	const [inputYearTo, setInputYearTo] = useState<number>(new Date().getFullYear() - 1);

	function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
		const elementType = event.target.id;
		if (elementType === "year-from") { setInputYearFrom(+event.target.value); }
		else { setInputYearTo(+event.target.value); }
	}

	function handleOnClick() {
		setIsActive(currentValue => !currentValue);
		const yearRange: IYearRange = { fromYear: inputYearFrom, toYear: inputYearTo };
		props.onClick !== undefined && props.onClick(!isActive ? yearRange : null);
	}

	return (
		<>
			<input id="year-from" disabled={isActive} type="number" min="1930" value={inputYearFrom} onChange={handleOnChange} className="min-w-0 w-full border bg-transparent border-gray-300 dark:border-slate-600 p-3" />
			to
			<input id="year-to" disabled={isActive} type="number" min="1931" value={inputYearTo} onChange={handleOnChange} className="min-w-0 w-full border bg-transparent border-gray-300 dark:border-slate-600 p-3" />
			<button
				role="button"
				onClick={handleOnClick}
				className={`border pt-1 pb-1 flex items-center justify-center h-fit px-4 rounded-full ${isActive
					? "border-transparent bg-yellow-400 hover:bg-yellow-500 dark:bg-indigo-900 dark:hover:bg-indigo-800"
					: " hover:bg-slate-100 dark:hover:bg-indigo-950 border-gray-300 dark:border-slate-600"}`}
			>
				Include
			</button>
		</>
	);
}
