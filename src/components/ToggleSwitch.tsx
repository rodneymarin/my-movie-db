import "./ToggleSwitch.css";

export interface IToggleSwitchProps {
}

export default function ToggleSwitch(props: IToggleSwitchProps) {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
        </label>
    );
}
