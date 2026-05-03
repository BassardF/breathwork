import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/EmptyState';
import type { CombinedHistoryItem, TrainingType } from '../../../types/domain';
import { formatClock } from '../../../utils/formatTime';
import { useStatisticsQuery } from '../queries';

const TYPES: { value: TrainingType; label: string }[] = [
  { value: 'breath-hold', label: 'Breath Hold' },
  { value: 'co2', label: 'CO2 Table' },
  { value: 'o2', label: 'O2 Table' },
  { value: 'pattern', label: 'Breathing' },
];

const PAGE_SIZE = 20;

export function StatisticsView() {
  const { data } = useStatisticsQuery();
  const [selectedTypes, setSelectedTypes] = useState<TrainingType[]>([]);
  const [page, setPage] = useState(1);

  if (!data) {
    return <div className="text-sm text-slate-500">Loading statistics…</div>;
  }

  const bestHold = data.breathHolds[0];
  const bestCo2 = [...data.co2Sessions].sort((a, b) => b.completed_rounds - a.completed_rounds)[0];
  const bestO2 = [...data.o2Sessions].sort((a, b) => b.completed_rounds - a.completed_rounds)[0];
  const bestPattern = [...data.breathingSessions].sort((a, b) => b.cycles_completed - a.cycles_completed)[0];

  const holdProgress = [...data.breathHolds]
    .reverse()
    .map((entry) => ({
      date: new Date(entry.recorded_at).toLocaleDateString(),
      seconds: entry.duration_seconds,
    }));

  const completionTrend = [...data.co2Sessions, ...data.o2Sessions]
    .slice(0, 30)
    .reverse()
    .map((entry, index) => ({
      session: index + 1,
      rounds: entry.completed_rounds,
    }));

  const history: CombinedHistoryItem[] = [
    ...data.breathHolds.map((entry) => ({
      id: entry.id,
      type: 'breath-hold' as const,
      timestamp: entry.recorded_at,
      label: 'Max Breath Hold',
      detail: formatClock(entry.duration_seconds),
    })),
    ...data.co2Sessions.map((entry) => ({
      id: entry.id,
      type: 'co2' as const,
      timestamp: entry.completed_at,
      label: 'CO2 Table',
      detail: `${entry.completed_rounds}/8 rounds`,
    })),
    ...data.o2Sessions.map((entry) => ({
      id: entry.id,
      type: 'o2' as const,
      timestamp: entry.completed_at,
      label: 'O2 Table',
      detail: `${entry.completed_rounds}/8 rounds`,
    })),
    ...data.breathingSessions.map((entry) => ({
      id: entry.id,
      type: 'pattern' as const,
      timestamp: entry.completed_at,
      label: entry.pattern_name,
      detail: `${entry.cycles_completed} cycles`,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const isAll = selectedTypes.length === 0;
  const toggleType = (type: TrainingType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setPage(1);
  };
  const filtered = isAll ? history : history.filter((entry) => selectedTypes.includes(entry.type));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Breath Hold PB</p>
          <p className="text-4xl font-semibold text-white">{bestHold ? formatClock(bestHold.duration_seconds) : '--:--'}</p>
          <p className="text-sm text-slate-400">
            {bestHold ? new Date(bestHold.recorded_at).toLocaleDateString() : 'No data yet'}
          </p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Best Tables</p>
          <p className="text-sm text-slate-300">CO2: {bestCo2 ? `${bestCo2.completed_rounds}/8 rounds` : 'No data yet'}</p>
          <p className="text-sm text-slate-300">O2: {bestO2 ? `${bestO2.completed_rounds}/8 rounds` : 'No data yet'}</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Breathing Cycles</p>
          <p className="text-4xl font-semibold text-white">{bestPattern?.cycles_completed ?? 0}</p>
          <p className="text-sm text-slate-400">{bestPattern?.pattern_name ?? 'No data yet'}</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-white">PB over time</h2>
          {holdProgress.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={holdProgress}>
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="seconds" stroke="#bae6fd" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState title="No breath hold data" description="Complete a max hold to start tracking your PB trend." />
          )}
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Table completion trend</h2>
          {completionTrend.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionTrend}>
                  <XAxis dataKey="session" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[0, 8]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rounds" stroke="#7dd3fc" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState title="No table sessions" description="CO2 and O2 sessions will appear here once you start logging them." />
          )}
        </Card>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">Session history</h2>
          <span className="shrink-0 text-sm text-slate-500">{filtered.length} sessions</span>
        </div>
        <div className="flex flex-wrap gap-2">
           <button
            type="button"
            onClick={() => setSelectedTypes([])}
            className={`rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer ${
              isAll
                ? 'border-sky-300/40 bg-sky-950/40 text-sky-300'
                : 'border-white/10 bg-slate-950/45 text-slate-400 hover:border-white/20'
            }`}
          >
            All
          </button>
          {TYPES.map((t) => {
            const active = selectedTypes.includes(t.value);
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => toggleType(t.value)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer ${
                  active
                    ? 'border-sky-300/40 bg-sky-950/40 text-sky-300'
                    : 'border-white/10 bg-slate-950/45 text-slate-400 hover:border-white/20'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {paginated.map((entry) => (
            <details key={`${entry.type}-${entry.id}`} className="rounded-3xl bg-slate-950/45 px-4 py-3">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{entry.label}</p>
                    <p className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-slate-300">{entry.detail}</p>
                </div>
              </summary>
              <p className="mt-3 text-sm text-slate-400">Type: {entry.type}</p>
            </details>
          ))}
          {filtered.length === 0 ? <EmptyState title="No session history" description="Saved sessions across all modes appear here." /> : null}
        </div>
        {totalPages > 1 ? (
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-white/10 bg-slate-950/45 px-3 py-1.5 text-xs text-slate-400 transition-colors cursor-pointer hover:border-white/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                  p === page
                    ? 'bg-sky-950/40 text-sky-300 border border-sky-300/40'
                    : 'border border-white/10 bg-slate-950/45 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-white/10 bg-slate-950/45 px-3 py-1.5 text-xs text-slate-400 transition-colors cursor-pointer hover:border-white/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
