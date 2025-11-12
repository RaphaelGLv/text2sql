import styles from "./page.module.css";
import { DbSchemasList } from "./components/db-schemas-list/db-schemas-list";

export default function Home() {  
  return (
    <main className={styles.main}>
      <DbSchemasList />
    </main>
  );
}
