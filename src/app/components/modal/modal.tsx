"use client";

import styles from "./modal.module.css";
import { FocusTrap } from "focus-trap-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <FocusTrap>
        <div className={styles.backdrop} role="dialog" aria-modal="true">
          <div className={styles.container}>
            {title && <header className={styles.header}><h4>{title}</h4></header>}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
    </FocusTrap>
  );
}

export default Modal;
