import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { Co2TableFlow } from '../features/co2-table/components/Co2TableFlow';

export function Co2Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CO2 Tolerance"
        title="CO2 Table"
        description="Fixed hold duration, descending rest windows, and a preview before you begin."
      />
      <p className="-mt-4">
        <Link
          to="/learn?section=co2"
          className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors"
        >
          Learn why this works →
        </Link>
      </p>
      <Co2TableFlow />
    </div>
  );
}
