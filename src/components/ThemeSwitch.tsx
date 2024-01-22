import { useEffect, useState } from "react";

export default function ThemeSwitch() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark)
            document.body.classList.add("dark");
        else
            document.body.classList.remove("dark");
    }, [isDark])

    function handleOnClick() {
        setIsDark(curVal => !curVal);
    }

    return (
        <div onClick={handleOnClick} className="h-8 w-16 flex flex-col justify-center bg-slate-300 dark:bg-slate-800 rounded-full cursor-pointer">
            <div className={`w-6 h-6 mx-1 bg-slate-500 dark:bg-indigo-700 rounded-full transition-all text-center
             ${isDark
                    ? " ml-8"
                    : ""
                }`}>
                <i className={`fa-solid ${isDark ? "fa-moon" : "fa-sun"} fa-sm text-yellow-400 dark:text-slate-300`}></i>
            </div>
        </div>
    );
}
