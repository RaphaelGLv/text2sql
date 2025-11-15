import styles from "./navbar.module.css";
import { BackButton } from "./components/back-button.client";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <BackButton />
    </nav>
  );
}
