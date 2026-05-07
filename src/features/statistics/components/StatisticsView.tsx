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

  const allWithHr = [
    ...data.breathHolds.filter((e) => e.avg_heart_rate).map((e) => ({ hr: e.avg_heart_rate!, date: e.recorded_at, type: 'hold' as const })),
    ...data.co2Sessions.filter((e) => e.avg_heart_rate).map((e) => ({ hr: e.avg_heart_rate!, date: e.completed_at, type: 'co2' as const })),
    ...data.o2Sessions.filter((e) => e.avg_heart_rate).map((e) => ({ hr: e.avg_heart_rate!, date: e.completed_at, type: 'o2' as const })),
    ...data.breathingSessions.filter((e) => e.avg_heart_rate).map((e) => ({ hr: e.avg_heart_rate!, date: e.completed_at, type: 'pattern' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestHr = allWithHr[0];

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const weeklyBreathingSessions = data.breathingSessions.filter(
    (s) => new Date(s.completed_at) >= startOfWeek,
  ).length;
  const weeklyCo2Sessions = data.co2Sessions.filter(
    (s) => new Date(s.completed_at) >= startOfWeek,
  ).length;
  const weeklyO2Sessions = data.o2Sessions.filter(
    (s) => new Date(s.completed_at) >= startOfWeek,
  ).length;

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
      detail: `${formatClock(entry.duration_seconds)}${entry.avg_heart_rate ? ` · Avg HR ${entry.avg_heart_rate}` : ''}`,
    })),
    ...data.co2Sessions.map((entry) => ({
      id: entry.id,
      type: 'co2' as const,
      timestamp: entry.completed_at,
      label: 'CO2 Table',
      detail: `${entry.completed_rounds}/8 rounds${entry.avg_heart_rate ? ` · Avg HR ${entry.avg_heart_rate}` : ''}`,
    })),
    ...data.o2Sessions.map((entry) => ({
      id: entry.id,
      type: 'o2' as const,
      timestamp: entry.completed_at,
      label: 'O2 Table',
      detail: `${entry.completed_rounds}/8 rounds${entry.avg_heart_rate ? ` · Avg HR ${entry.avg_heart_rate}` : ''}`,
    })),
    ...data.breathingSessions.map((entry) => ({
      id: entry.id,
      type: 'pattern' as const,
      timestamp: entry.completed_at,
      label: entry.pattern_name,
      detail: `${entry.cycles_completed} cycles${entry.avg_heart_rate ? ` · Avg HR ${entry.avg_heart_rate}` : ''}`,
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
      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Breath Hold PB</p>
          <p className="text-4xl font-semibold text-white">{bestHold ? formatClock(bestHold.duration_seconds) : '--:--'}</p>
          <p className="text-sm text-slate-400">
            {bestHold ? new Date(bestHold.recorded_at).toLocaleDateString() : 'No data yet'}
          </p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Tables</p>
          <p className="text-sm text-slate-300"><strong>CO2</strong> - {weeklyCo2Sessions} session{weeklyCo2Sessions > 1 ? 's' : ''}</p>
          <p className="text-sm text-slate-300"><strong>O2</strong> - {weeklyO2Sessions} session{weeklyO2Sessions > 1 ? 's' : ''}</p>
          <p className="text-xs text-slate-500">weekly</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Breathing</p>
          <p className="text-4xl font-semibold text-white">{weeklyBreathingSessions}</p>
          <p className="text-sm text-slate-400">weekly session{weeklyBreathingSessions > 1 ? 's' : ''}</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">Heart Rate</p>
          <p className="text-4xl font-semibold text-white">{latestHr ? `${latestHr.hr}` : '--'}</p>
          <p className="text-sm text-slate-400">{latestHr ? `${latestHr.date ? new Date(latestHr.date).toLocaleDateString() : ''} avg` : 'No data yet'}</p>
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
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e2e8f0', fontSize: '13px' }} />
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
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e2e8f0', fontSize: '13px' }} />
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
