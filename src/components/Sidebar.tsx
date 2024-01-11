import { PropsWithChildren } from "react";

export interface ISidebarProps {
}

export function Sidebar(props: PropsWithChildren<ISidebarProps>) {
    return (
        <div className="sidebar">
            {props.children}
        </div>
    );
}
