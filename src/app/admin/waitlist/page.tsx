'use client';

import { useState } from 'react';

export default function AdminWaitlistExportPage() {
  const [token, setToken] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleExport(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const qs = new URLSearchParams();
      if (from) qs.set('from', from);
      if (to) qs.set('to', to);

      const res = await fetch(`/api/waitlist/export${qs.toString() ? `?${qs}` : ''}`, {
        method: 'GET',
        headers: { 'x-admin-token': token },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${res.status})`);
      }

      // Get the filename from the response (fallback if header missing)
      const cd = res.headers.get('content-disposition') || '';
      const match = /filename="?([^"]+)"?/.exec(cd);
      const filename = match?.[1] || `waitlist_${new Date().toISOString().slice(0, 10)}.csv`;

      // Download the CSV blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMsg(`Exported successfully: ${filename}`);
    } catch (e: any) {
      setErr(e?.message || 'Export failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Waitlist Export (Admin)</h1>

      <form onSubmit={handleExport} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Admin token</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste ADMIN_EXPORT_SECRET"
            className="w-full rounded-xl bg-[#16141d] border border-gray-700 focus:border-pink-500 outline-none px-4 py-3 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">From (ISO date/time)</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="2025-11-01 or 2025-11-01T00:00:00Z"
              className="w-full rounded-xl bg-[#16141d] border border-gray-700 focus:border-pink-500 outline-none px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">To (ISO date/time)</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="2025-12-01 or 2025-12-01T00:00:00Z"
              className="w-full rounded-xl bg-[#16141d] border border-gray-700 focus:border-pink-500 outline-none px-4 py-3 text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl px-4 py-3 font-medium bg-pink-600/90 hover:bg-pink-600 disabled:opacity-60"
        >
          {loading ? 'Exporting…' : 'Download CSV'}
        </button>

        {msg && <p className="text-green-400 text-sm">{msg}</p>}
        {err && <p className="text-red-400 text-sm">{err}</p>}
      </form>

      <p className="mt-6 text-xs text-gray-400">
        Your token is never stored or logged—it's only sent as an HTTP header to the export API route.
      </p>
    </div>
  );
}
