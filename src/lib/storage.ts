// Simple local JSON file storage for Next.js local demo
// For demo only: not for production use
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'public', 'data');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function readJson<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) return fallback;
  const raw = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Demo seeders
import { User } from '../types/models';

const demoUsers: User[] = [
  {
    id: '1',
    email: 'submitter@test.com',
    name: 'Submitter',
    role: 'submitter',
    passwordHash: 'Password123!',
  },
  {
    id: '2',
    email: 'admin@test.com',
    name: 'Admin',
    role: 'admin',
    passwordHash: 'Password123!',
  },
];

export function seedDemoUsers() {
  writeJson('users.json', demoUsers);
}
