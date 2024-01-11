import { PropsWithChildren, useState } from "react";

export interface IToggleButtonProps {
    onClick?: (isActive: boolean, id: string) => void;
    className?: string;
    id: string; //value to use in the api query string
    initialIsActive: boolean; //initial state for first render
}

export default function ToggleButton(props: PropsWithChildren<IToggleButtonProps>) {
    const [isActive, setIsSelected] = useState<boolean>(props.initialIsActive);

    function buttonHandler() {
        setIsSelected(!isActive);
        props.onClick !== undefined && props.onClick(!isActive, props.id);
    }

    return (
        <button role="button" onClick={buttonHandler} className={`shaped-element hover-behavior font-md ${isActive ? "selected" : ""} ${props.className == undefined ? "" : props.className}`} >
            {props.children}
        </button>
    );
}
