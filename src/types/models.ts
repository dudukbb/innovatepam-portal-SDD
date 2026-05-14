// Data model types for InnovatEPAM Portal MVP

export type UserRole = 'submitter' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string; // For demo only; never store plaintext in real apps
}

export type IdeaStatus = 'draft' | 'submitted' | 'review' | 'approved' | 'rejected';

export type IdeaCategory = 'innovation' | 'process' | 'product' | 'other';

export interface Idea {
  id: string;
  title: string;
  description: string;
  authorId: string;
  status: IdeaStatus;
  category: IdeaCategory;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  ideaId: string;
  authorId: string;
  content: string;
  createdAt: string;
}
