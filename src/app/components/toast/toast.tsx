'use client';

import { useToastStore } from "@/app/stores/toast/toast.store";
import style from "./toast.module.css";


export function Toast() {
    const { show, type, message } = useToastStore();

    return (
        <>
            <div aria-live="polite" className={`${style.toast} ${style[type]} ${show ? style.show : ''}`}>
                {message}
            </div>
        </>
    );
};