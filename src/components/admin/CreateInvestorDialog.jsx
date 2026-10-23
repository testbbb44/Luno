import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, Copy } from "lucide-react";
import { baseUrl } from "@/features/api/apiSlice";

const plans = {
  starter: { name: "Starter", minimum: 3000, days: 30 },
  professional: { name: "Professional", minimum: 5000, days: 45 },
  enterprise: { name: "Enterprise", minimum: 10000, days: 60 },
};
const initial = () => ({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  confirmPassword: "",
  amount: "",
  investedAt: "",
  investmentPlanId: "starter",
  amountInCrypto: "",
  cryptoCoinName: "",
  importReference: crypto.randomUUID(),
});
export default function CreateInvestorDialog({ open, onOpenChange }) {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState(null);
  const [uncertain, setUncertain] = useState(false);
  const [copied, setCopied] = useState(false);
  const pending = useRef(null);
  const submitting = useRef(false);
  const plan = plans[form.investmentPlanId];
  const change = (event) => {
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));
    setErrors([]);
  };
  const close = (nextOpen) => {
    if (busy) return;
    if (!nextOpen) {
      if (result) reset();
    }
    onOpenChange(nextOpen);
  };
  function reset() {
    setForm(initial());
    pending.current = null;
    setResult(null);
    setUncertain(false);
    setErrors([]);
    setCopied(false);
  }
  function reportErrors(messages) {
    const text = messages.filter(message => typeof message === "string" && message.trim());
    const errors = text.length ? text : ["Account creation failed. Please try again."];
    setErrors(errors);
    toast.error(errors.join(" "));
  }
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    if (!pending.current) {
      const date = new Date(form.investedAt);
      const validation = [];
      if (form.password !== form.confirmPassword)
        validation.push("Passwords do not match.");
      if (!Number.isFinite(+date) || date > new Date())
        validation.push("Investment date must be valid and not in the future.");
      if (
        !Number.isFinite(Number(form.amount)) ||
        Number(form.amount) < plan.minimum
      )
        validation.push(
          `Minimum investment for ${plan.name} is USD ${plan.minimum.toLocaleString()}.`,
        );
      if (!!form.amountInCrypto !== !!form.cryptoCoinName)
        validation.push(
          "Provide both the crypto amount and coin name, or leave both empty.",
        );
      if (validation.length) {
        reportErrors(validation);
        return;
      }
      pending.current = {
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        phoneNumber: form.phoneNumber.trim(),
        amount: Number(form.amount),
        investedAt: date.toISOString(),
        currency: "USD",
      };
      if (form.amountInCrypto) {
        pending.current.amountInCrypto = Number(form.amountInCrypto);
        pending.current.cryptoCoinName = form.cryptoCoinName
          .trim()
          .toUpperCase();
      } else {
        delete pending.current.amountInCrypto;
        delete pending.current.cryptoCoinName;
      }
    }
    submitting.current = true;
    setBusy(true);
    setErrors([]);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(`${baseUrl}admin/import-investor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pending.current),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        if (response.status >= 500) setUncertain(true);
        else if (!uncertain) pending.current = null;
        reportErrors([
          data.message || "Account creation failed.",
          ...(Array.isArray(data.errors) ? data.errors : []),
        ]);
        return;
      }
      setResult(data.data);
      toast.success(data.message || (data.data?.replayed ? "Original account import retrieved successfully." : "Account and investment history created successfully."));
      setUncertain(false);
    } catch {
      setUncertain(true);
      reportErrors([
        "The result could not be confirmed. Retry this same request; the import reference prevents duplicates.",
      ]);
    } finally {
      clearTimeout(timer);
      submitting.current = false;
      setBusy(false);
    }
  }
  async function copyCredentials() {
    try {
      await navigator.clipboard.writeText(
        `Username: ${result.username}\nEmail: ${result.email}\nPassword: ${pending.current.password}`,
      );
      setCopied(true);
      toast.success("Login credentials copied.");
    } catch {
      reportErrors([
        "Clipboard unavailable. Share the username/email and the password you entered manually.",
      ]);
    }
  }
  const field = (name, label, options = {}) => (
    <label className="lv-admin-field">
      <span>{label}</span>
      <Input
        name={name}
        value={form[name]}
        onChange={change}
        required
        autoComplete="off"
        {...options}
      />
    </label>
  );
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className="lv-admin-create-dialog"
        onEscapeKeyDown={(event) => {
          if (busy) event.preventDefault();
        }}
        onPointerDownOutside={(event) => {
          if (busy) event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {result ? "Account created" : "Create new users"}
          </DialogTitle>
          <DialogDescription>
            {result
              ? "The account, investment, and dated earnings history are ready."
              : "Create an account for an existing investor and import their original deposit and daily earnings."}
          </DialogDescription>
        </DialogHeader>
        {errors.length > 0 && (
          <ul className="lv-connect-error" role="alert">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {result ? (
          <div className="space-y-4">
            <div className="lv-demo-success">
              <CheckCircle size={19} />
              <span>
                {result.replayed
                  ? "Original import retrieved. No duplicate account was created."
                  : "Account and investment history created successfully."}
              </span>
            </div>
            <dl className="lv-admin-result">
              {[
                ["Username", result.username],
                ["Email", result.email],
                ["User ID", result.userId],
                ["Invested", `USD ${result.amountInvested}`],
                ["Earnings", `USD ${result.totalProfit}`],
                ["Investment value", `USD ${result.investmentValue}`],
                ["Days credited", result.creditedDays],
                ["History entries", result.transactionCount],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="lv-demo-help">
              Copy the login credentials and share them privately with the
              customer. No message is sent automatically. Closing this dialog
              clears the entered password.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={copyCredentials}>
                <Copy size={16} />
                {copied ? "Copied" : "Copy login credentials"}
              </Button>
              <Button variant="outline" onClick={reset}>
                Create another user
              </Button>
              <Button variant="ghost" onClick={() => close(false)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {uncertain && (
              <p className="lv-notice" role="status">
                The previous result is uncertain. Details are locked so Retry
                sends the identical request.
              </p>
            )}
            <fieldset disabled={busy || uncertain} className="space-y-5">
              <legend className="lv-eyebrow mb-3">CUSTOMER DETAILS</legend>
              <div className="lv-admin-fields">
                {field("firstName", "First name", {
                  minLength: 2,
                  maxLength: 50,
                })}
                {field("lastName", "Last name", {
                  minLength: 2,
                  maxLength: 50,
                })}
                {field("email", "Email", { type: "email" })}
                {field("phoneNumber", "Phone number", {
                  type: "tel",
                  placeholder: "+2348012345678",
                })}
                {field("username", "Username", {
                  pattern: "[a-zA-Z0-9_]{3,32}",
                  minLength: 3,
                  maxLength: 32,
                })}
                {field("password", "Password", {
                  type: "password",
                  minLength: 8,
                  pattern:
                    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*",
                  autoComplete: "new-password",
                })}
                {field("confirmPassword", "Confirm password", {
                  type: "password",
                  minLength: 8,
                  autoComplete: "new-password",
                })}
              </div>
              <p className="lv-demo-help">
                Password must include uppercase, lowercase, a number, and a
                special character.
              </p>
              <div className="lv-eyebrow">ORIGINAL INVESTMENT</div>
              <div className="lv-admin-fields">
                <label className="lv-admin-field">
                  <span>Selected plan</span>
                  <select
                    name="investmentPlanId"
                    value={form.investmentPlanId}
                    onChange={change}
                    className="lv-demo-example-select"
                  >
                    {Object.entries(plans).map(([id, p]) => (
                      <option key={id} value={id}>
                        {p.name} - {p.days} days - minimum USD {p.minimum}
                      </option>
                    ))}
                  </select>
                </label>
                {field("amount", "Amount invested (USD)", {
                  type: "number",
                  min: plan.minimum,
                  max: 1000000000,
                  step: "0.01",
                })}
                {field(
                  "investedAt",
                  "Investment date and time (your local timezone)",
                  { type: "datetime-local", step: 60 },
                )}
                {field("importReference", "Import reference", {
                  readOnly: true,
                })}
                {field("amountInCrypto", "Crypto amount (optional)", {
                  type: "number",
                  min: "0.00000001",
                  step: "any",
                  required: false,
                })}
                {field("cryptoCoinName", "Coin name (optional)", {
                  required: false,
                  minLength: 2,
                  maxLength: 20,
                  placeholder: "BTC",
                })}
              </div>
              <p className="lv-demo-help">
                The server applies the plan rate and maturity. This import
                assumes no earlier withdrawals or additional deposits. Principal
                stays separate from the available earnings balance.
              </p>
            </fieldset>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => close(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating account...
                  </>
                ) : uncertain ? (
                  "Retry same request"
                ) : (
                  "Create account and history"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
