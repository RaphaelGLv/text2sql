import styles from "./text2sql-answer-list.module.css";
import { Text2SqlAnswerEntity } from "@/app/entities/text2sql-answer.entity";

interface Text2SqlAnswerListProps {
  answers: Text2SqlAnswerEntity[];
}

export function Text2SqlAnswerList({ answers }: Text2SqlAnswerListProps) {
  return (
    <ul className={styles.list}>
      {answers.map((answer) => (
        <li key={answer.id} className={styles.item}>
          <span className={styles.question}>
            <strong>Pergunta:</strong> {answer.question}
          </span>
          <span className={styles.answer}>
            <strong>Resposta SQL:</strong> {answer.answer}
          </span>
        </li>
      ))}
    </ul>
  );
}
