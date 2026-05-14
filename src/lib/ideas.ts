import { Comment, Idea } from '../types/models';

const IDEAS_KEY = 'innovatepam_ideas';
const COMMENTS_KEY = 'innovatepam_comments';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readLocalStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocalStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

async function seedCollectionIfNeeded<T>(key: string, filePath: string): Promise<void> {
  if (!isBrowser()) return;

  const existing = readLocalStorage<T[]>(key, []);
  if (existing.length > 0) return;

  try {
    const response = await fetch(filePath, { cache: 'no-store' });
    if (!response.ok) {
      writeLocalStorage<T[]>(key, []);
      return;
    }

    const data = (await response.json()) as T[];
    if (Array.isArray(data)) {
      writeLocalStorage<T[]>(key, data);
      return;
    }
  } catch {
    // Ignore fetch errors and fallback to empty arrays.
  }

  writeLocalStorage<T[]>(key, []);
}

export async function ensureIdeasSeeded(): Promise<void> {
  await seedCollectionIfNeeded<Idea>(IDEAS_KEY, '/data/ideas.json');
}

export async function ensureCommentsSeeded(): Promise<void> {
  await seedCollectionIfNeeded<Comment>(COMMENTS_KEY, '/data/comments.json');
}

export async function getAllIdeas(): Promise<Idea[]> {
  await ensureIdeasSeeded();
  return readLocalStorage<Idea[]>(IDEAS_KEY, []);
}

export async function getIdeasByUser(userId: string): Promise<Idea[]> {
  const ideas = await getAllIdeas();
  return ideas.filter((idea) => idea.createdById === userId);
}

export async function getIdeaById(id: string): Promise<Idea | undefined> {
  const ideas = await getAllIdeas();
  return ideas.find((idea) => idea.id === id);
}

export async function addIdea(idea: Idea): Promise<void> {
  const ideas = await getAllIdeas();
  ideas.push(idea);
  writeLocalStorage(IDEAS_KEY, ideas);
}

export async function getCommentsByIdeaId(ideaId: string): Promise<Comment[]> {
  await ensureCommentsSeeded();
  const comments = readLocalStorage<Comment[]>(COMMENTS_KEY, []);
  return comments.filter((comment) => comment.ideaId === ideaId);
}
