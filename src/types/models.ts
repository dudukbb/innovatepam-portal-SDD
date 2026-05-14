// Data model types for InnovatEPAM Portal MVP

export type UserRole = 'submitter' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string; // For demo only; never store plaintext in real apps
}

export type IdeaStatus = 'submitted' | 'under_review' | 'accepted' | 'rejected';

export type IdeaCategory = 'innovation' | 'process' | 'product' | 'other';

export interface Idea {
  id: string;
  title: string;
  description: string;
  createdById: string;
  status: IdeaStatus;
  category?: IdeaCategory;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  ideaId: string;
  createdById: string;
  authorName: string;
  role: UserRole;
  message: string;
  createdAt: string;
}
