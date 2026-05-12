// Client-side validation for the notebook contact form.
// Mirrors my-portfolio (disposable blacklist, name guards, format checks),
// plus an optional live deliverability check via AbstractAPI.

const disposableDomains = new Set([
  "10minutemail.com", "guerrillamail.com", "mailinator.com", "temp-mail.org",
  "throwaway.email", "yopmail.com", "getnada.com", "maildrop.cc",
  "tempmail.ninja", "fakeinbox.com", "sharklasers.com", "guerrillamailblock.com",
  "sjhdj.com", "example.com", "test.com", "fake.com", "invalid.com",
  "sdbhs.sd", "test.test", "fake.fake", "0-mail.com", "10mail.org",
  "20minutemail.com", "30minutemail.com", "anonbox.net", "anonymbox.com",
  "antispam.de", "bccto.me", "bigstring.com", "casualdx.com",
  "deadaddress.com", "devnullmail.com", "discardmail.com", "disposableinbox.com",
  "dispose.it", "dispostable.com", "dodgeit.com", "dontreg.com",
  "dump-email.info", "dumpmail.de", "e4ward.com", "emailmiser.com",
  "ephemail.net", "explodemail.com", "fakemailz.com", "filzmail.com",
  "flyspam.com", "forgetmail.com", "getairmail.com", "getonemail.com",
  "guerillamail.com", "guerillamail.de", "guerrillamail.biz",
  "guerrillamail.de", "guerrillamail.net", "guerrillamail.org",
  "haltospam.com", "hidemail.de", "hotpop.com", "incognitomail.com",
  "instant-mail.de", "jetable.com", "jetable.org", "junk1e.com",
  "killmail.com", "killmail.net", "kurzepost.de", "lackmail.net",
  "letthemeatspam.com", "mailcatch.com", "mailexpire.com", "mailnesia.com",
  "mailnull.com", "mailzilla.com", "nomail.xl.cx", "nospam.ze.tc",
  "objectmail.com", "ownmail.net", "proxymail.eu", "putthisinyouremail.com",
  "quickinbox.com", "rcpt.at", "reallymymail.com", "recode.me",
  "regbypass.com", "safetymail.info", "sandelf.de", "saynotospams.com",
  "selfdestructingmail.com", "sneakemail.com",
  "sogetthis.com", "soodonims.com", "spam4.me", "spamavert.com",
  "spambox.us", "spamcero.com", "spamcorptastic.com", "spamfree24.org",
  "spamgourmet.com", "spamherelots.com", "spamhole.com", "spaml.de",
  "spammotel.com", "spamobox.com", "spamspot.com", "spamthis.co.uk",
  "speed.1s.fr", "superrito.com", "suremail.info", "tempalias.com",
  "tempe4mail.com", "tempemail.co.za", "tempemail.net", "tempinbox.com",
  "tempmail.eu", "tempmail2.com", "tempmaildemo.com", "tempmailer.com",
  "tempomail.fr", "temporarily.de", "temporarioemail.com.br",
  "temporaryemail.net", "temporaryforwarding.com", "temporaryinbox.com",
  "thankyou2010.com", "thisisnotmyrealemail.com", "throwawayemailaddress.com",
  "tittbit.in", "tradermail.info", "trash-mail.at", "trash-mail.com",
  "trashmail.at", "trashmail.com", "trashmail.me", "trashmail.net",
  "trashymail.com", "trashymail.net", "uggsrock.com", "veryreallymymail.com",
  "wasteland.rfc822.org", "webemail.me", "weg-werf-email.de",
  "wegwerfmail.de", "wegwerfmail.net", "wh4f.org", "whyspam.me",
  "wilemail.com", "willselfdestruct.com", "winemaven.info",
  "wronghead.com", "wuzup.net", "wuzupmail.net", "wwwnew.eu",
  "xagloo.com", "xemaps.com", "xents.com", "xmaily.com",
  "yep.it", "yogamaven.com", "yopmail.fr", "ypmail.webarnak.fr.eu.org",
  "zehnminutenmail.de", "zippymail.info",
]);

export function validateName(name: string): string | null {
  const t = name.trim();
  if (!t) return "Please enter your name.";
  if (t.length < 2) return "Name must be at least 2 characters.";
  if (t.length > 60) return "Name is too long.";
  if (!/^[\p{L}\s'.-]+$/u.test(t)) {
    return "Name can only contain letters, spaces, hyphens, apostrophes.";
  }
  if (!/\p{L}/u.test(t)) return "Name must contain at least one letter.";
  if (/['.\-\s]{3,}/.test(t)) return "Too many consecutive special characters.";
  if (/^[\s'.-]|[\s'.-]$/.test(t)) {
    return "Name cannot start or end with a special character.";
  }
  const fakes = [
    /^test$/i, /^fake$/i, /^name$/i, /^(abc|xyz|123)$/i,
    /^(.)\1{4,}/, /^(qwerty|asdf|zxcv)/i,
    /^john\s+doe$/i, /^jane\s+doe$/i,
  ];
  if (fakes.some((p) => p.test(t))) return "Please enter your real name.";
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length < 2) return "Please enter your full name.";
  if (words.length > 4) return "Please use a shorter name (max 4 words).";
  return null;
}

export function validateEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isDisposable(email: string): boolean {
  const domain = email.trim().split("@")[1]?.toLowerCase();
  return !!domain && disposableDomains.has(domain);
}

export function validateEmail(email: string): string | null {
  const t = email.trim();
  if (!t) return "Please enter your email.";
  if (!validateEmailFormat(t)) return "That doesn't look like a valid email.";
  if (isDisposable(t)) return "Please use a permanent email address.";
  const domain = t.split("@")[1]?.toLowerCase() ?? "";
  if (domain.length < 4 || !domain.includes(".")) return "Email domain looks off.";
  return null;
}

export function validateMessage(message: string): string | null {
  const t = message.trim();
  if (!t) return "Please write a message.";
  if (t.length < 10) return "A few more words, please (min 10 characters).";
  if (t.length > 2000) return "Message is too long (max 2000 characters).";
  return null;
}

export type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function validateAll(values: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const n = validateName(values.name);
  const e = validateEmail(values.email);
  const m = validateMessage(values.message);
  if (n) errors.name = n;
  if (e) errors.email = e;
  if (m) errors.message = m;
  return errors;
}

// ---------- Live email deliverability check (AbstractAPI) ----------
// Key is the same one used in subashsdhami.com.np. Vite would inline any
// VITE_* env into the public bundle anyway, so there's no benefit to hiding
// this behind import.meta.env — the key is rate-limited on AbstractAPI's
// side and is intended for client-side use.

const ABSTRACT_API_KEY = "ebbb8ee161c340f3b782e7f81d61dd25";

export type EmailApiResult = {
  valid: boolean;
  disposable?: boolean;
  reason?: string;
};

type RateRef = { current: number };

const RATE_MS = 1100;

export async function checkEmailDeliverability(
  email: string,
  rate: RateRef,
  signal?: AbortSignal,
): Promise<EmailApiResult> {
  // Rate limit to ~1 call/sec per AbstractAPI's free plan.
  const now = Date.now();
  const wait = RATE_MS - (now - rate.current);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  rate.current = Date.now();

  try {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${encodeURIComponent(email)}`,
      { signal },
    );
    if (!res.ok) return { valid: true, reason: "API unavailable" };
    const data = (await res.json()) as {
      deliverability?: string;
      is_valid_format?: { value?: boolean };
      is_mx_found?: { value?: boolean };
      is_disposable_email?: { value?: boolean };
    };
    const valid =
      data.deliverability === "DELIVERABLE" &&
      data.is_valid_format?.value !== false &&
      data.is_mx_found?.value !== false;
    return {
      valid,
      disposable: data.is_disposable_email?.value === true,
      reason: data.deliverability,
    };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { valid: true, reason: "aborted" };
    }
    return { valid: true, reason: "API unavailable" };
  }
}
