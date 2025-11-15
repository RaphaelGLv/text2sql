import { Navbar } from "../navbar/navbar";
import styles from "./base-screen.module.css";

interface BaseScreenProps {
  children: React.ReactNode;
  hasHeader?: boolean;
  className?: string;
}

export function BaseScreen({
  children,
  hasHeader = true,
  className,
}: BaseScreenProps) {
  return (
    <div>
      {hasHeader && <Navbar />}
      <div className={`${styles.content} ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
