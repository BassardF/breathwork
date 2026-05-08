import { PageHeader } from '../components/layout/PageHeader';
import { LearnOverview } from '../features/learn/components/LearnOverview';

export function LearnPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Base"
        title="Learn"
        description="Understand the why and the how behind every training method. Browse by goal or explore physiology concepts."
      />
      <LearnOverview />
    </div>
  );
}
