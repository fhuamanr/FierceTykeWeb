import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "../atoms/Button";
import { TextInput } from "../atoms/TextInput";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => Promise<void>;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(username, password);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo iniciar sesion");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <TextInput
        label="Usuario"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <TextInput
        label="Contrasena"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button icon={<LogIn size={18} />} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Validando" : "Entrar"}
      </Button>
      {error ? <p className="form-status form-status--error">{error}</p> : null}
    </form>
  );
}

