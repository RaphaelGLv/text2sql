export enum AppButtonTypes {
    PRIMARY = 'PRIMARY',
}

export interface AppButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: AppButtonTypes;
    disabled?: boolean;    
    buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'disabled'>;
}