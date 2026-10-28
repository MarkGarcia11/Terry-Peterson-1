import { ArrowRight, Paperclip } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SITE } from "../data/content";

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredContact: string;
  operation: string;
  description: string;
  urgency: string;
};

const emptyValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  preferredContact: "",
  operation: "",
  description: "",
  urgency: "routine",
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(emptyValues);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "success" | "error" | "note"; text: string } | null>(null);
  const [fileName, setFileName] = useState("");

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (feedback) setFeedback(null);
  };

  const openMailDraft = (formData: FormData) => {
    const lines = [
      `Name: ${String(formData.get("name") || "")}`,
      `Company: ${String(formData.get("company") || "")}`,
      `Email: ${String(formData.get("email") || "")}`,
      `Phone: ${String(formData.get("phone") || "")}`,
      `Preferred contact: ${String(formData.get("preferredContact") || "Not specified")}`,
      `Operation: ${String(formData.get("operation") || "Not specified")}`,
      `Urgency: ${String(formData.get("urgency") || "Not specified")}`,
      "",
      "What I am seeing:",
      String(formData.get("description") || ""),
    ];
    if (formData.get("photo") instanceof File && (formData.get("photo") as File).name) {
      lines.push("", `Photo to attach: ${(formData.get("photo") as File).name}`, "Please attach this photo to your email reply.");
    }
    const subject = compact ? "Powder coating question" : "Powder coating inquiry";
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.assign(mailto);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setFeedback(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined;

    // TODO: Set VITE_INQUIRY_ENDPOINT in Vercel to a trusted form endpoint that accepts multipart/form-data.
    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: "POST", body: formData });
        if (!response.ok) throw new Error(`Form service returned ${response.status}`);
        setFeedback({ kind: "success", text: "Your note is on its way. Terry will reply as soon as he can." });
        setValues(emptyValues);
        setFileName("");
        form.reset();
      } catch {
        openMailDraft(formData);
        setFeedback({ kind: "error", text: "The form service could not send this message. An email draft has been opened instead." });
      } finally {
        setSending(false);
      }
      return;
    }

    openMailDraft(formData);
    setFeedback({ kind: "note", text: "Your email draft is ready. Please send it to reach Terry." });
    setSending(false);
  };

  if (compact) {
    return (
      <form className="contact-form quick-form" onSubmit={submit}>
        <div className="quick-form-grid">
          <label className="form-field">
            <span>Your name</span>
            <input name="name" autoComplete="name" required value={values.name} onChange={(event) => update("name", event.target.value)} />
          </label>
          <label className="form-field">
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} />
          </label>
        </div>
        <label className="form-field">
          <span>What are you seeing?</span>
          <textarea
            name="description"
            rows={3}
            required
            placeholder="A short description is enough to start."
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </label>
        <input type="hidden" name="company" value={values.company} />
        <input type="hidden" name="phone" value={values.phone} />
        <input type="hidden" name="preferredContact" value={values.preferredContact} />
        <input type="hidden" name="operation" value={values.operation} />
        <input type="hidden" name="urgency" value={values.urgency} />
        {feedback && <p className={`form-feedback form-feedback--${feedback.kind}`} role={feedback.kind === "error" ? "alert" : "status"}>{feedback.text}</p>}
        <div className="quick-form-footer">
          <button className="button button--solid" type="submit" disabled={sending}>
            <span>{sending ? "Preparing..." : "Send a note"}</span><ArrowRight size={16} aria-hidden="true" />
          </button>
          <span className="form-reassurance">I read every message myself.</span>
        </div>
      </form>
    );
  }

  return (
    <form className="contact-form full-form" onSubmit={submit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Name <b aria-hidden="true">*</b></span>
          <input name="name" autoComplete="name" required value={values.name} onChange={(event) => update("name", event.target.value)} />
        </label>
        <label className="form-field">
          <span>Company</span>
          <input name="company" autoComplete="organization" value={values.company} onChange={(event) => update("company", event.target.value)} />
        </label>
        <label className="form-field">
          <span>Email <b aria-hidden="true">*</b></span>
          <input name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} />
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} />
        </label>
        <label className="form-field">
          <span>Preferred contact method <b aria-hidden="true">*</b></span>
          <select name="preferredContact" required value={values.preferredContact} onChange={(event) => update("preferredContact", event.target.value)}>
            <option value="" disabled>Select one</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Email">Email</option>
          </select>
        </label>
        <label className="form-field">
          <span>Type of operation</span>
          <select name="operation" value={values.operation} onChange={(event) => update("operation", event.target.value)}>
            <option value="">Select one</option>
            <option value="Job shop">Job shop</option>
            <option value="OEM">OEM</option>
            <option value="Aerospace">Aerospace</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="form-field form-field--wide">
          <span>What are you seeing? <b aria-hidden="true">*</b></span>
          <textarea
            name="description"
            rows={6}
            required
            placeholder="What does the finish look like? When does it happen? What have you already tried? A few details help me understand where to start."
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </label>
        <label className="form-field">
          <span>How soon do you need help?</span>
          <select name="urgency" value={values.urgency} onChange={(event) => update("urgency", event.target.value)}>
            <option value="routine">Routine</option>
            <option value="soon">Soon</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
        <label className="form-field file-field">
          <span>Photos (optional)</span>
          <span className="file-picker">
            <Paperclip aria-hidden="true" size={16} />
            <span>{fileName || "Choose a photo"}</span>
            <input
              name="photo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
          </span>
          <small>JPG, PNG, or WebP. If using the email fallback, attach the file to your draft.</small>
        </label>
      </div>
      {feedback && <p className={`form-feedback form-feedback--${feedback.kind}`} role={feedback.kind === "error" ? "alert" : "status"}>{feedback.text}</p>}
      <div className="full-form-footer">
        <button className="button button--solid" type="submit" disabled={sending}>
          <span>{sending ? "Sending..." : "Send your message"}</span><ArrowRight size={16} aria-hidden="true" />
        </button>
        <p>I read every message myself and will reply as soon as I can.</p>
      </div>
    </form>
  );
}