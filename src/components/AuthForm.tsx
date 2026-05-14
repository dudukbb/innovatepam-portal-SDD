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
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto p-6 bg-white rounded shadow">
      {fields.map(f => (
        <div key={String(f.name)}>
          <label className="block text-sm font-medium mb-1">{f.label}</label>
          <input
            name={String(f.name)}
            type={f.type || 'text'}
            value={values[f.name as string] || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            autoComplete={f.type === 'password' ? 'new-password' : 'off'}
          />
          {errors[f.name as string] && (
            <div className="text-red-500 text-xs mt-1">{errors[f.name as string]}</div>
          )}
        </div>
      ))}
      {formError && <div className="text-red-600 text-sm mb-2">{formError}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Processing...' : submitLabel}
      </button>
    </form>
  );
}
