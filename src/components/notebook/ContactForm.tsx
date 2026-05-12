import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef, useState } from "react";

import {
  checkEmailDeliverability,
  isDisposable,
  validateEmailFormat,
  validateMessage,
  validateName,
} from "@/lib/contact-validation";

const FORM_ID = "xvggerej";

type Status = "idle" | "checking" | "valid" | "invalid";

function StatusIcon({ status }: { status: Status }) {
  if (status === "checking") {
    return (
      <span className="cform-status cform-status-checking" aria-label="checking">
        <span className="spinner" aria-hidden="true" />
        checking…
      </span>
    );
  }
  if (status === "valid") {
    return (
      <span className="cform-status cform-status-valid" aria-label="looks valid">
        ✓ ok
      </span>
    );
  }
  if (status === "invalid") {
    return (
      <span className="cform-status cform-status-invalid" aria-label="invalid">
        ✕ no
      </span>
    );
  }
  return null;
}

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORM_ID);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameStatus, setNameStatus] = useState<Status>("idle");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailStatus, setEmailStatus] = useState<Status>("idle");

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const apiRate = useRef({ current: 0 });
  const apiAbort = useRef<AbortController | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestEmail = useRef("");

  useEffect(() => {
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
      apiAbort.current?.abort();
    };
  }, []);

  // ---------- Name ----------
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setName(v);
    setNameError("");
    if (!v.trim()) {
      setNameStatus("idle");
      return;
    }
    const err = validateName(v);
    if (err) {
      setNameError(err);
      setNameStatus("invalid");
    } else {
      setNameStatus("valid");
    }
  }

  // ---------- Email ----------
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setEmail(v);
    latestEmail.current = v;
    setEmailError("");

    if (debounce.current) clearTimeout(debounce.current);
    apiAbort.current?.abort();

    if (!v.trim()) {
      setEmailStatus("idle");
      return;
    }
    if (!validateEmailFormat(v)) {
      setEmailError("Please enter a valid email format.");
      setEmailStatus("invalid");
      return;
    }
    if (isDisposable(v)) {
      setEmailError("Please use a permanent email address.");
      setEmailStatus("invalid");
      return;
    }

    // Format passes — kick off the debounced live deliverability check.
    setEmailStatus("checking");
    debounce.current = setTimeout(async () => {
      if (v !== latestEmail.current) return;
      const ctrl = new AbortController();
      apiAbort.current = ctrl;
      const result = await checkEmailDeliverability(v, apiRate.current, ctrl.signal);
      if (v !== latestEmail.current) return;

      if (!result.valid) {
        setEmailError("That email doesn't appear to exist.");
        setEmailStatus("invalid");
      } else if (result.disposable) {
        setEmailError("Please use a permanent email address.");
        setEmailStatus("invalid");
      } else {
        setEmailStatus("valid");
      }
    }, 1500);
  }

  // ---------- Message ----------
  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setMessage(v);
    if (messageError) {
      const err = validateMessage(v);
      setMessageError(err ?? "");
    }
  }
  function handleMessageBlur() {
    const err = validateMessage(message);
    setMessageError(err ?? "");
  }

  // ---------- Submit ----------
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nErr = validateName(name);
    if (nErr) {
      setNameError(nErr);
      setNameStatus("invalid");
      return;
    }
    if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email.");
      setEmailStatus("invalid");
      return;
    }
    if (isDisposable(email)) {
      setEmailError("Please use a permanent email.");
      setEmailStatus("invalid");
      return;
    }
    const mErr = validateMessage(message);
    if (mErr) {
      setMessageError(mErr);
      return;
    }
    if (emailStatus === "checking" || emailStatus === "invalid") return;

    void handleSubmit(e);
  }

  const submitDisabled =
    state.submitting ||
    emailStatus === "checking" ||
    emailStatus === "invalid" ||
    nameStatus === "invalid" ||
    (!!name && nameStatus !== "valid") ||
    (!!email && emailStatus !== "valid");

  if (state.succeeded) {
    return (
      <div className="cform cform-success" role="status">
        <p className="cform-success-h">— message received —</p>
        <p>
          Thanks for writing in. I'll reply when I can, usually within a week. If
          it's urgent, nudge me again.
        </p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate id="contact-form">
      <div className="cform-row">
        <div className="cform-label-row">
          <label htmlFor="cf-name">your name</label>
          <StatusIcon status={nameStatus} />
        </div>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={handleNameChange}
          aria-invalid={nameStatus === "invalid"}
          aria-describedby={nameError ? "cf-name-err" : undefined}
          placeholder="e.g. Subash Singh Dhami"
        />
        {nameError && (
          <span id="cf-name-err" className="cform-err">
            {nameError}
          </span>
        )}
      </div>

      <div className="cform-row">
        <div className="cform-label-row">
          <label htmlFor="cf-email">your email</label>
          <StatusIcon status={emailStatus} />
        </div>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          aria-invalid={emailStatus === "invalid"}
          aria-describedby={emailError ? "cf-email-err" : undefined}
          placeholder="name@somewhere.tld"
        />
        {emailError && (
          <span id="cf-email-err" className="cform-err">
            {emailError}
          </span>
        )}
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="cform-err"
        />
      </div>

      <div className="cform-row">
        <label htmlFor="cf-message">your message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          value={message}
          onChange={handleMessageChange}
          onBlur={handleMessageBlur}
          aria-invalid={Boolean(messageError)}
          aria-describedby={messageError ? "cf-message-err" : undefined}
          placeholder="A line, a paragraph, a question — whatever you came to say."
        />
        <div className="cform-meta">
          <span>{message.trim().length} / 2000</span>
        </div>
        {messageError && (
          <span id="cf-message-err" className="cform-err">
            {messageError}
          </span>
        )}
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="cform-err"
        />
      </div>

      {/* honeypot — bots fill this, humans don't */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <button type="submit" className="cform-submit" disabled={submitDisabled}>
        {state.submitting
          ? "sending…"
          : emailStatus === "checking"
            ? "checking email…"
            : "send the letter →"}
      </button>

      {state.errors && Array.isArray(state.errors) && state.errors.length > 0 && (
        <p className="cform-err cform-err-server">
          Something didn't land. Try again, or email me directly.
        </p>
      )}
    </form>
  );
}
