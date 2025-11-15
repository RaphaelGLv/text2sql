export enum AppButtonTypes {
    PRIMARY = "PRIMARY",
}

export enum AppButtonVariants{
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
}

export interface AppButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: AppButtonTypes;
    variant?: AppButtonVariants;
    disabled?: boolean;
    buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className" | "disabled">;
}