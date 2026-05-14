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
    <form onSubmit={handleSubmit(onSubmit)} className="app-surface space-y-6 p-6 sm:p-8">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="app-input"
          placeholder="Give your idea a clear title"
        />
        {errors.title ? <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.title.message}</p> : null}
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          {...register('description')}
          className="app-input min-h-[10rem] resize-y"
          placeholder="Describe the problem, your approach, and expected impact"
        />
        {errors.description ? <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.description.message}</p> : null}
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category"
          {...register('category')}
          className="app-input"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-slate-700">
          Attachment (single file, max 5MB)
        </label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="w-full rounded-xl border border-slate-300/90 bg-white px-3.5 py-3 text-sm text-slate-700 shadow-sm transition file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-medium file:text-slate-700 hover:border-slate-400"
        />
        <p className="mt-1.5 text-xs text-slate-500">{fileNameLabel}</p>
      </div>

      {submitError ? <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{submitError}</p> : null}

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="app-button-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </button>
      </div>
    </form>
  );
}
