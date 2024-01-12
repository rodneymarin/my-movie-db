import { PropsWithChildren, useState } from "react";

export interface IToggleButtonProps {
    onClick?: () => void;
    className?: string;
    value: string;
    isActive: boolean;
}

export default function ToggleButton(props: PropsWithChildren<IToggleButtonProps>) {
    //const [isActive, setIsSelected] = useState<boolean>(props.initialIsActive);
    return (
        <button role="button" onClick={props.onClick} className={`shaped-element hover-behavior font-md ${props.isActive ? "selected" : ""} ${props.className == undefined ? "" : props.className}`} >
            {props.children}
        </button>
    );
}
