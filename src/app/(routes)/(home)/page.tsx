import styles from "./page.module.css";
import { DbSchemasList } from "../../components/ui/db-schemas-list/db-schemas-list";
import { BaseScreen } from "../../components/layout/base-screen/base-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Text2SQL",
};

export default function Home() {
  return (
    <BaseScreen hasHeader={false}>
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Text2SQL</h1>

        <DbSchemasList />
      </main>
    </BaseScreen>
  );
}
