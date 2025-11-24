"use client";

import React, { useRef, useState } from "react";
import styles from "./file-input.module.css";
import { AppButton } from "../../buttons/app-button";

interface FileInputProps {
  id: string;
  label: string;
  onChange: (file: File | null) => void | Promise<void>;
  required?: boolean;
  accept?: string;
}

export function FileInput({
  id,
  label,
  accept,
  onChange,
  required,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChoose() {
    inputRef.current?.click();
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    const file = list && list.length > 0 ? list[0] : null;

    try {
      await Promise.resolve(onChange(file));
      setFileName(file?.name ?? null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      inputRef.current!.value = "";
      setFileName(null);
    }
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.controls}>
        <AppButton onClick={handleChoose}>Escolher arquivo</AppButton>
        <div className={styles.preview}>
          {fileName ? (
            <span>{fileName}</span>
          ) : (
            <span className={styles.hint}>Nenhum arquivo selecionado</span>
          )}
        </div>
      </div>

      <input
        id={id}
        name={id}
        ref={inputRef}
        className={styles.hiddenInput}
        type="file"
        accept={accept}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}
