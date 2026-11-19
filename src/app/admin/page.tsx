"use client";

import { useState } from "react";

type Entry = {
  id: string;
  name: string;
  email: string;
  platform: string;
  niche: string;
  monthly_volume: string;
  biggest_challenge: string;
  created_at: string;
  source?: string;
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(adminKey: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/waitlist?key=${encodeURIComponent(adminKey)}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to load");
        setEntries([]);
        setCount(0);
        return;
      }
      const data = await res.json();
      setEntries(data.entries || []);
      setCount(data.count || 0);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!entries.length) return;
    const headers: (keyof Entry)[] = [
      "id",
      "name",
      "email",
      "platform",
      "niche",
      "monthly_volume",
      "biggest_challenge",
      "created_at",
      "source",
    ];
    const rows = entries.map((e) =>
      headers
        .map((h) => {
          const val = e[h] ?? "";
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clipforge-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space)" }}>
          ClipForge Admin
        </h1>
        <p className="text-zinc-400 mb-8">Waitlist registrations</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FA4616] w-full sm:w-64"
          />
          <button
            onClick={() => load(key)}
            disabled={loading || !key}
            className="bg-[#FA4616] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#e03d12] disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load"}
          </button>
          <button
            onClick={exportCsv}
            disabled={!entries.length}
            className="border border-zinc-600 text-zinc-200 px-5 py-2 rounded-lg text-sm hover:border-zinc-400 disabled:opacity-40"
          >
            Export CSV
          </button>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <p className="text-zinc-400 mb-4">
          Total: <span className="text-white font-medium">{count}</span>
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Niche</th>
                <th className="px-4 py-3">Volume</th>
                <th className="px-4 py-3">Challenge</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-t border-zinc-800 hover:bg-zinc-900/50">
                  <td className="px-4 py-3 whitespace-nowrap">{e.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{e.email}</td>
                  <td className="px-4 py-3">{e.platform}</td>
                  <td className="px-4 py-3">{e.niche}</td>
                  <td className="px-4 py-3">{e.monthly_volume}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={e.biggest_challenge}>
                    {e.biggest_challenge}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-500">
                    {new Date(e.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {!entries.length && !loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-zinc-500">
                    No entries yet or enter the admin key to load.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
