import styles from "./app-button.module.css";
import primaryStyles from "./styles/primary.module.css";
import { AppButtonProps, AppButtonTypes } from "./app-button.types";

export function AppButton({
  children,
  onClick,
  className,
  type = AppButtonTypes.PRIMARY,
  variant,
  disabled = false,
  buttonProps,
}: AppButtonProps) {
  const buttonTypesMap: Record<AppButtonTypes, typeof primaryStyles> = {
    [AppButtonTypes.PRIMARY]: primaryStyles,
  };

  const CurrentButtonStyles = buttonTypesMap[type];
  const variantKey = variant ? `variant_${variant}` : "";
  const variantClass = variantKey
    ? (CurrentButtonStyles as unknown as Record<string, string>)[variantKey] ?? ""
    : "";

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${CurrentButtonStyles.button} ${variantClass} ${className}`}
      type="button"
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
