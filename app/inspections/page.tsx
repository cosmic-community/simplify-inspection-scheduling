import Link from 'next/link';
import { getInspections } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';

export default async function InspectionsPage() {
  const inspections = await getInspections();

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10">
          <div className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">Schedule</div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-3">Inspections</h1>
          <p className="text-lg text-gray-600 max-w-2xl">All scheduled inspections coordinated by Baltimore Permits, sorted by date.</p>
        </div>

        {inspections.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600">No inspections scheduled yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {inspections.map((inspection) => {
              const dateObj = inspection.metadata?.scheduled_datetime
                ? new Date(inspection.metadata.scheduled_datetime)
                : null;
              return (
                <Link key={inspection.id} href={`/inspections/${inspection.slug}`} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow block">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {dateObj && (
                      <div className="flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-3 w-20 text-center">
                        <div className="text-xs uppercase font-semibold">
                          {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-2xl font-bold">
                          {dateObj.getDate()}
                        </div>
                        <div className="text-xs">
                          {dateObj.getFullYear()}
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <StatusBadge status={inspection.metadata?.inspection_status} />
                        <PriorityBadge priority={inspection.metadata?.priority} />
                      </div>
                      <h3 className="text-xl font-bold text-navy-800 mb-1">{inspection.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {inspection.metadata?.inspection_type && (
                          <span>🔍 {getMetafieldValue(inspection.metadata.inspection_type)}</span>
                        )}
                        {inspection.metadata?.project && (
                          <span>🏗️ {inspection.metadata.project.title}</span>
                        )}
                        {inspection.metadata?.assigned_inspector && (
                          <span>👷 {inspection.metadata.assigned_inspector.title}</span>
                        )}
                      </div>
                    </div>
                    <div className="hidden md:block text-orange-500 text-2xl">→</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}