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
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  category: z.enum(['innovation', 'process', 'product', 'other']).optional(),
  fileUrl: z.string().optional(),
});

export const adminReviewFormSchema = z.object({
  status: z.enum(['under_review', 'accepted', 'rejected']),
  comment: z.string().min(3),
});

export const commentFormSchema = z.object({
  content: z.string().min(1),
});
