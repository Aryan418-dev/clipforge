import { promises as fs } from "fs";
import path from "path";

export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  platform: string;
  niche: string;
  monthly_volume: string;
  biggest_challenge: string;
  consent: boolean;
  created_at: string;
  source?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Failed to ensure data file", e);
  }
}

export async function getEntries(): Promise<WaitlistEntry[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

export async function addEntry(
  entry: Omit<WaitlistEntry, "id" | "created_at">
): Promise<{ success: true; entry: WaitlistEntry } | { success: false; error: string }> {
  await ensureDataFile();
  const entries = await getEntries();

  const normalizedEmail = entry.email.trim().toLowerCase();
  if (entries.some((e) => e.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: "This email is already registered on the waitlist." };
  }

  const newEntry: WaitlistEntry = {
    ...entry,
    id: crypto.randomUUID(),
    email: normalizedEmail,
    created_at: new Date().toISOString(),
  };

  entries.push(newEntry);
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  return { success: true, entry: newEntry };
}
