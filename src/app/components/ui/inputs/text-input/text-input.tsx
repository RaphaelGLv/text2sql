"use client";

import React from "react";
import styles from "./text-input.module.css";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  required?: boolean;
  placeholder?: string;
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "placeholder" | "type" | "required"
  >;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  inputProps,
}: TextInputProps) {
  return (
    <label htmlFor={id} className={styles.label}>
      <span>{label}</span>

      <input
        id={id}
        name={id}
        className={styles.textInput}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        {...inputProps}
        autoComplete="off"
      />
    </label>
  );
}
