import { Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { TextInput } from "../atoms/TextInput";
import type { Profile } from "../../types";

type ProfileFormProps = {
  profile: Profile;
  onSave: (profile: Profile) => Promise<void>;
};

export function ProfileForm({ onSave, profile }: ProfileFormProps) {
  const [draft, setDraft] = useState(profile);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");

    try {
      await onSave({
        ...draft,
        specialties: draft.specialties.filter(Boolean)
      });
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <TextInput
          label="Fundador"
          name="founderName"
          value={draft.founderName}
          onChange={(event) => update("founderName", event.target.value)}
          required
        />
        <TextInput
          label="Empresa"
          name="companyName"
          value={draft.companyName}
          onChange={(event) => update("companyName", event.target.value)}
          required
        />
      </div>
      <TextInput
        label="Rol"
        name="role"
        value={draft.role}
        onChange={(event) => update("role", event.target.value)}
      />
      <TextInput
        label="Titular"
        name="headline"
        value={draft.headline}
        onChange={(event) => update("headline", event.target.value)}
        multiline
      />
      <TextInput
        label="Historia"
        name="story"
        value={draft.story}
        onChange={(event) => update("story", event.target.value)}
        multiline
      />
      <TextInput
        label="Mision"
        name="mission"
        value={draft.mission}
        onChange={(event) => update("mission", event.target.value)}
        multiline
      />
      <div className="form-grid">
        <TextInput
          label="Correo"
          name="email"
          type="email"
          value={draft.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <TextInput
          label="Web"
          name="website"
          value={draft.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      <TextInput
        label="Especialidades"
        name="specialties"
        hint="Separalas por coma."
        value={draft.specialties.join(", ")}
        onChange={(event) =>
          update(
            "specialties",
            event.target.value.split(",").map((item) => item.trim())
          )
        }
      />
      <div className="form-actions">
        <Button icon={<Save size={18} />} type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Guardando" : "Guardar perfil"}
        </Button>
        {status === "saved" ? <p className="form-status form-status--ok">Perfil actualizado.</p> : null}
        {status === "error" ? <p className="form-status form-status--error">No se pudo guardar.</p> : null}
      </div>
    </form>
  );
}
