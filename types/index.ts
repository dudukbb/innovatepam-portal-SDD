// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "employee" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// Idea Types
export type IdeaStatus = "draft" | "submitted" | "under_review" | "accepted" | "rejected";

export interface Idea {
  id: string;
  title: string;
  description: string;
  category?: string;
  status: IdeaStatus;
  fileAttachmentUrl?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIdeaInput {
  title: string;
  description: string;
  category?: string;
  file?: File;
}

export interface UpdateIdeaInput {
  title?: string;
  description?: string;
  category?: string;
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  ideaId: string;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentInput {
  content: string;
  ideaId: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
