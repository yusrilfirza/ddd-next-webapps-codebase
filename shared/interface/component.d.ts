import { ReactNode } from "react";

export interface InputProps {
    placeholder?: string;
    name?: string;
    block?: boolean;
    label?: string;
}

export interface ButtonProps {
    label?: string | ReactNode;
    className?: string;
    color?: string;
    type?: "button" | "reset" | "submit" | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}