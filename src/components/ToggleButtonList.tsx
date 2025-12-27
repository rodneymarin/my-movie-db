import { useEffect, useState } from "react";
import { IValueKeyItem } from "../global.types";



export interface IToggleButtonListProps {
	items: IValueKeyItem[],
	onClick?: (selection: IValueKeyItem[]) => void;
}

export default function ToggleButtonList(props: IToggleButtonListProps) {
	const [selectionIndexes, setSelectionIndexes] = useState<number[]>([]);

	useEffect(() => {
		props.onClick && props.onClick(
			selectionIndexes.map(index => props.items[index])
		);
	}, [selectionIndexes]);

	function handleOnClick(index: number) {
		if (selectionIndexes.includes(index)) {
			//current array minus clicked item
			setSelectionIndexes(currentSelection => currentSelection.filter(sel => sel !== index));
		} else {
			setSelectionIndexes(currentSelection => [...currentSelection, index]);
		}

	}

	return (
		<>
			{
				props.items.map((item, index) => {
					return (
						<button key={item.key} role="button" onClick={() => handleOnClick(index)}
							className={`border py-1 px-4 rounded-full flex justify-center items-center ${selectionIndexes.includes(index) ? "border-transparent bg-yellow-400 hover:bg-yellow-500 dark:bg-indigo-900 dark:hover:bg-indigo-800" : " hover:bg-slate-100 dark:hover:bg-indigo-950 border-gray-300 dark:border-slate-600"}`}
						>
							{item.value}
						</button>
					);
				})
			}
		</>
	);
}
