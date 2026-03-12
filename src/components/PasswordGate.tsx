import { useState } from "react";

const CORRECT_PASSWORD = "V2!";
const STORAGE_KEY = "stacq-auth";

export function usePasswordGate() {
  return localStorage.getItem(STORAGE_KEY) === CORRECT_PASSWORD;
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem(STORAGE_KEY) === CORRECT_PASSWORD);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, CORRECT_PASSWORD);
      setAuthenticated(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4 text-center">
        <h1 className="text-lg font-mono tracking-tight text-foreground">Passord påkrevd</h1>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          placeholder="Skriv inn passord"
          autoFocus
          className="w-full h-10 px-3 py-2 rounded-sm border border-border bg-secondary text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {error && <p className="text-destructive text-sm font-mono">Feil passord</p>}
        <button
          type="submit"
          className="w-full h-10 rounded-sm bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-colors"
        >
          Logg inn
        </button>
      </form>
    </div>
  );
}
