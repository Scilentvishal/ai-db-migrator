"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function migrate() {
    try {
      setLoading(true);

      const res = await fetch("/api/db-migrator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
            AI Powered Migration Tool
          </div>

          <h1 className="mt-4 text-5xl font-bold">
            Database Migration Agent
          </h1>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Convert MongoDB, Mongoose, Prisma, PostgreSQL or MySQL code
            automatically using AI.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur">
            <div className="border-b border-slate-800 px-6 py-4">
              <h2 className="font-semibold text-lg">
                Source Code
              </h2>
            </div>

            <div className="p-6">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your MongoDB or database code here..."
                className="h-[500px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm outline-none transition focus:border-cyan-500"
              />

              <button
                onClick={migrate}
                disabled={loading || !code}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Migrating...
                  </>
                ) : (
                  "🚀 Start Migration"
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <h2 className="font-semibold text-lg">
                AI Generated Output
              </h2>

              {result && (
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(result)
                  }
                  className="rounded-lg border border-slate-700 px-3 py-1 text-sm hover:bg-slate-800"
                >
                  Copy
                </button>
              )}
            </div>

            <div className="p-6">
              <pre className="h-[500px] overflow-auto rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-green-400 whitespace-pre-wrap">
                {result ||
                  `AI generated migration code will appear here...`}
              </pre>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold">MongoDB → MySQL</h3>
            <p className="mt-2 text-sm text-slate-400">
              Convert Mongoose schemas and queries.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold">Prisma Support</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generate schema.prisma automatically.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold">Migration Reports</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generate downloadable migration summaries.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}