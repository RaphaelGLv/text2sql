import styles from "./page.module.css";
import { DbSchemasList } from "./components/ui/db-schemas-list/db-schemas-list";

export default function Home() {  
  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>
        Text2SQL
      </h1>
      
      <DbSchemasList />
    </main>
  );
}
