// Client-safe auth/session helpers for local MVP demo
import { User, UserRole } from '../types/models';

const USERS_KEY = 'innovatepam_users';
const SESSION_KEY = 'innovatepam_session';
const DEMO_PASSWORD = 'Password123!';

export interface SessionUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

const employeeRoutes = new Set(['/dashboard', '/submit', '/submit-idea', '/my-ideas']);
const adminRoutes = new Set(['/admin']);

const fallbackUsers: User[] = [
  {
    id: '1',
    email: 'submitter@test.com',
    name: 'Submitter',
    role: 'submitter',
    passwordHash: DEMO_PASSWORD,
  },
  {
    id: '2',
    email: 'admin@test.com',
    name: 'Admin',
    role: 'admin',
    passwordHash: DEMO_PASSWORD,
  },
];

function withDemoAccounts(users: User[]): User[] {
  const demoEmails = new Set(fallbackUsers.map((user) => user.email.toLowerCase()));
  const nonDemoUsers = users.filter((user) => !demoEmails.has(user.email.toLowerCase()));

  return [...nonDemoUsers, ...fallbackUsers];
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readUsersFromStorage(): User[] {
  if (!isBrowser()) return [];

  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function writeUsersToStorage(users: User[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function ensureUsersSeeded(): Promise<void> {
  if (!isBrowser()) return;

  const existing = readUsersFromStorage();
  if (existing.length > 0) return;

  try {
    const response = await fetch('/data/users.json', { cache: 'no-store' });
    if (!response.ok) {
      writeUsersToStorage(fallbackUsers);
      return;
    }

    const users = (await response.json()) as User[];
    if (Array.isArray(users) && users.length > 0) {
      writeUsersToStorage(users);
      return;
    }
  } catch {
    // Ignore and fall back to defaults.
  }

  writeUsersToStorage(fallbackUsers);
}

export async function getAllUsers(): Promise<User[]> {
  await ensureUsersSeeded();
  const users = withDemoAccounts(readUsersFromStorage());
  writeUsersToStorage(users);
  return users;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getAllUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await getAllUsers();
  return users.find((user) => user.id === id);
}

export async function getDemoUser(role: UserRole): Promise<User | undefined> {
  const demoEmail = role === 'admin' ? 'admin@test.com' : 'submitter@test.com';
  return findUserByEmail(demoEmail);
}

export async function addUser(user: User): Promise<void> {
  const users = await getAllUsers();
  users.push(user);
  writeUsersToStorage(users);
}

export function setSession(user: User): void {
  if (!isBrowser()) return;

  const session: SessionUser = {
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  };

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): SessionUser | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function getRequiredRoleForPath(path: string | null | undefined): UserRole | null {
  if (!path) return null;

  if (employeeRoutes.has(path)) return 'submitter';
  if (adminRoutes.has(path)) return 'admin';

  return null;
}

export function buildLoginRedirectUrl(path: string, role: UserRole): string {
  const params = new URLSearchParams({ redirect: path, role: role === 'admin' ? 'admin' : 'employee' });
  return `/login?${params.toString()}`;
}

export function getDefaultRouteForRole(role: UserRole): string {
  return role === 'admin' ? '/admin' : '/dashboard';
}

export function getAuthorizedRedirectPath(role: UserRole, requestedPath: string | null | undefined): string {
  if (!requestedPath) {
    return getDefaultRouteForRole(role);
  }

  const requiredRole = getRequiredRoleForPath(requestedPath);
  if (!requiredRole) {
    return getDefaultRouteForRole(role);
  }

  return requiredRole === role ? requestedPath : getDefaultRouteForRole(role);
}
