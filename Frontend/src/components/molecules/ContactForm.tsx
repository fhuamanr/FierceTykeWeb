import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../atoms/Button";
import { TextInput } from "../atoms/TextInput";
import { api } from "../../services/api";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");

    try {
      await api.sendContact(form);
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <TextInput
          label="Nombre"
          name="name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <TextInput
          label="Correo"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
      </div>
      <TextInput
        label="Mensaje"
        name="message"
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        multiline
        required
      />
      <div className="form-actions">
        <Button icon={<Send size={18} />} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando" : "Enviar mensaje"}
        </Button>
        {status === "sent" ? <p className="form-status form-status--ok">Mensaje recibido.</p> : null}
        {status === "error" ? (
          <p className="form-status form-status--error">No se pudo enviar. Intenta nuevamente.</p>
        ) : null}
      </div>
    </form>
  );
}

