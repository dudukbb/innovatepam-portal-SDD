"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ideaSubmissionFormSchema } from '../types/forms';
import { IdeaCategory } from '../types/models';
import { z } from 'zod';

type IdeaSubmissionValues = z.infer<typeof ideaSubmissionFormSchema>;

export interface IdeaDraftInput {
  title: string;
  description: string;
  category?: IdeaCategory;
  fileUrl?: string;
}

interface IdeaFormProps {
  onSubmitIdea: (idea: IdeaDraftInput) => Promise<void>;
}

const categories: IdeaCategory[] = ['innovation', 'process', 'product', 'other'];

export function IdeaForm({ onSubmitIdea }: IdeaFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IdeaSubmissionValues>({
    resolver: zodResolver(ideaSubmissionFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'innovation',
      fileUrl: undefined,
    },
  });

  const selectedFileName = watch('fileUrl');

  const fileNameLabel = useMemo(() => {
    if (!selectedFileName) return 'No file selected';
    return selectedFileName;
  }, [selectedFileName]);

  async function onSubmit(values: IdeaSubmissionValues) {
    try {
      setSubmitError(null);
      setIsSubmitting(true);

      await onSubmitIdea({
        title: values.title,
        description: values.description,
        category: values.category,
        fileUrl: values.fileUrl,
      });
    } catch {
      setSubmitError('Unable to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setValue('fileUrl', undefined, { shouldValidate: true });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('Attachment must be 5MB or smaller.');
      setValue('fileUrl', undefined, { shouldValidate: true });
      event.target.value = '';
      return;
    }

    setSubmitError(null);
    setValue('fileUrl', file.name, { shouldValidate: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
          placeholder="Give your idea a clear title"
        />
        {errors.title ? <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p> : null}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          {...register('description')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
          placeholder="Describe the problem, your approach, and expected impact"
        />
        {errors.description ? <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p> : null}
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category"
          {...register('category')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="file" className="mb-1 block text-sm font-medium text-slate-700">
          Attachment (single file, max 5MB)
        </label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-slate-700"
        />
        <p className="mt-1 text-xs text-slate-500">{fileNameLabel}</p>
      </div>

      {submitError ? <p className="text-sm text-rose-600">{submitError}</p> : null}

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </button>
      </div>
    </form>
  );
}
