"use client";

import { useState } from 'react';
import { ZodSchema } from 'zod';

interface AuthFormProps<T> {
  schema: ZodSchema<T>;
  fields: Array<{ name: keyof T; label: string; type?: string }>;
  onSubmit: (values: T) => Promise<{ error?: string }>;
  submitLabel: string;
}

export function AuthForm<T>({ schema, fields, onSubmit, submitLabel }: AuthFormProps<T>) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setErrors({});
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    const { error } = await onSubmit(result.data);
    setLoading(false);
    if (error) setFormError(error);
  }

  return (
    <form onSubmit={handleSubmit} className="app-surface mx-auto w-full max-w-md space-y-6 p-8 sm:p-9">
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={String(f.name)} className="space-y-1.5">
            <label htmlFor={String(f.name)} className="block text-sm font-semibold leading-5 text-slate-800">
              {f.label}
            </label>
            <input
              id={String(f.name)}
              name={String(f.name)}
              type={f.type || 'text'}
              value={values[f.name as string] || ''}
              onChange={handleChange}
              className="app-input"
              autoComplete={f.type === 'password' ? 'new-password' : 'off'}
            />
            {errors[f.name as string] && (
              <div className="mt-1 text-xs font-medium text-rose-600">{errors[f.name as string]}</div>
            )}
          </div>
        ))}
      </div>
      {formError && <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</div>}
      <button
        type="submit"
        className="app-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Processing...' : submitLabel}
      </button>
    </form>
  );
}
