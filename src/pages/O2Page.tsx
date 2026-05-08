import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { O2TableFlow } from '../features/o2-table/components/O2TableFlow';

export function O2Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="O2 Tolerance"
        title="O2 Table"
        description="Steady recovery time with progressively longer holds based on your current personal best."
      />
      <p className="-mt-4">
        <Link
          to="/learn?section=o2"
          className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors"
        >
          Learn why this works →
        </Link>
      </p>
      <O2TableFlow />
    </div>
  );
}
