import AccordionItem from "./AccordionItem";
import FilterList from "./FilterList";
import { YearRange } from "./YearRange";
import { Sidebar } from "./Sidebar";
import ToggleButtonList from "./ToggleButtonList";
import { IValueKeyItem, IYearRange } from "../global.types";
import { PropsWithChildren, useState } from "react";

interface IFilters {
    yearRange: IYearRange | null,
    genres: IValueKeyItem[]
}

export interface ILayoutProps {
    genres: IValueKeyItem[],
    onSearchClick: (yearRange: IYearRange | null, genres: IValueKeyItem[]) => void
}

export default function Layout(props: PropsWithChildren<ILayoutProps>) {
    const [filters, setFilters] = useState<IFilters>({ yearRange: null, genres: [] });

    function onYearRangeClick(value: IYearRange | null) {
        setFilters(currentValue => ({ ...currentValue, yearRange: value }))
    }

    function onGenreClick(values: IValueKeyItem[]) {
        setFilters(currentValue => ({ ...currentValue, genres: values }))
    }

    return (
        <>
            <FilterList onSearchClick={props.onSearchClick} yearRange={filters.yearRange} genres={filters.genres} />

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div id="searchbar" className="border border-gray-300 dark:border-slate-600 rounded py-1 px-4 h-fit">
                    <Sidebar>
                        <AccordionItem title="Genre">
                            <div className="flex flex-row flex-wrap gap-2 pb-4">
                                {
                                    <ToggleButtonList
                                        items={props.genres}
                                        onClick={onGenreClick}
                                    />
                                }
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Release year">
                            <div className="flex flex-col xl:flex-row xl:flex-nowrap items-center gap-3 pb-4">
                                <YearRange onClick={onYearRangeClick} />
                            </div>
                        </AccordionItem>
                    </Sidebar>
                </div>
                <div id="search-result" className="w-full border border-gray-300 dark:border-slate-600 rounded p-4 lg:col-span-2 divide-y divide-slate-300">
                    {props.children}
                </div>
            </div>
        </>
    );
}
