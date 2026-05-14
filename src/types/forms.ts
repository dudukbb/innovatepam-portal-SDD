// Zod schemas for forms
import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const ideaSubmissionFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['innovation', 'process', 'product', 'other']),
});

export const adminReviewFormSchema = z.object({
  status: z.enum(['approved', 'rejected', 'review']),
  comment: z.string().min(3),
});

export const commentFormSchema = z.object({
  content: z.string().min(1),
});
