import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  hint?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

type TextInputProps = InputProps | TextareaProps;

export function TextInput({ hint, label, multiline, ...props }: TextInputProps) {
  const id = props.id ?? props.name;

  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea id={id} rows={5} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

