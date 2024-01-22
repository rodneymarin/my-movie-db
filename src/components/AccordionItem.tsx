import { PropsWithChildren, useState } from 'react'


export interface IAccordionItemProps {
    title: string;
}

export default function AccordionItem(props: PropsWithChildren<IAccordionItemProps>) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div className="">
            <label className="font-bold dark:text-white flex flex-row justify-between cursor-pointer py-3" onClick={() => setIsOpen(!isOpen)}>
                {props.title} <i className={isOpen ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"}></i>
            </label>
            <div className={isOpen ? "pt-2 pb-1 pl-4 h-auto overflow-auto" : "p-0 h-0 overflow-hidden"}>
                {props.children}
            </div>
        </div>
    );
}
