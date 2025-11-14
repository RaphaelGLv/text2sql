import styles from "./app-button.module.css";
import primaryStyles from "./styles/primary.module.css";
import { AppButtonProps, AppButtonTypes } from "./types";

export function AppButton({
  children,
  onClick,
  className,
  type = AppButtonTypes.PRIMARY,
  disabled = false,
  buttonProps,
}: AppButtonProps) {
  const buttonTypesMap: Record<AppButtonTypes, typeof primaryStyles> = {
    [AppButtonTypes.PRIMARY]: primaryStyles,
  };

  const CurrentButtonStyles = buttonTypesMap[type];

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${CurrentButtonStyles.button} ${className}`}
      type="button"
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
