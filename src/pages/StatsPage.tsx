import { PageHeader } from '../components/layout/PageHeader';
import { StatisticsView } from '../features/statistics/components/StatisticsView';

export function StatsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tracking"
        title="Statistics"
        description="Personal records, training trends, and a unified reverse-chronological session log."
      />
      <StatisticsView />
    </div>
  );
}
