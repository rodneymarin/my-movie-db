import { PropsWithChildren } from "react";

export interface ISidebarProps {
}

export function Sidebar(props: PropsWithChildren<ISidebarProps>) {
    return (
        <div className="divide-y divide-gray-300 dark:divide-slate-600">
            {props.children}
        </div>
    );
}
