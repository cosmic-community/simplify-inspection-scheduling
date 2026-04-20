// app/inspections/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInspection } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';

export default async function InspectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inspection = await getInspection(slug);

  if (!inspection) notFound();

  const dateObj = inspection.metadata?.scheduled_datetime
    ? new Date(inspection.metadata.scheduled_datetime)
    : null;

  return (
    <div className="py-12">
      <div className="container-custom max-w-5xl">
        <Link href="/inspections" className="text-orange-500 hover:text-orange-600 font-semibold mb-6 inline-flex items-center gap-2">
          ← Back to Inspections
        </Link>

        <div className="bg-gradient-to-br from-navy-800 to-navy-900 text-white rounded-xl p-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <StatusBadge status={inspection.metadata?.inspection_status} />
            <PriorityBadge priority={inspection.metadata?.priority} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{inspection.title}</h1>
          {inspection.metadata?.inspection_type && (
            <p className="text-navy-100 text-lg">🔍 {getMetafieldValue(inspection.metadata.inspection_type)}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {dateObj && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Scheduled Date & Time</div>
              <div className="text-2xl font-bold text-navy-800">
                {dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-orange-500 font-semibold mt-1">
                {dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          )}

          {inspection.metadata?.project && (
            <Link href={`/projects/${inspection.metadata.project.slug}`} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow block">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Project</div>
              <div className="text-xl font-bold text-navy-800 hover:text-orange-500 transition-colors">
                🏗️ {inspection.metadata.project.title}
              </div>
              {inspection.metadata.project.metadata?.address && (
                <div className="text-sm text-gray-600 mt-1">📍 {getMetafieldValue(inspection.metadata.project.metadata.address)}</div>
              )}
            </Link>
          )}

          {inspection.metadata?.assigned_inspector && (
            <Link href={`/inspectors/${inspection.metadata.assigned_inspector.slug}`} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow block">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Assigned Inspector</div>
              <div className="flex items-center gap-3">
                {inspection.metadata.assigned_inspector.metadata?.photo ? (
                  <img
                    src={`${inspection.metadata.assigned_inspector.metadata.photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={inspection.metadata.assigned_inspector.title}
                    width={60}
                    height={60}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center text-2xl">👷</div>
                )}
                <div>
                  <div className="font-bold text-navy-800 hover:text-orange-500 transition-colors">
                    {inspection.metadata.assigned_inspector.title}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {inspection.metadata?.notes && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-navy-800 mb-3">Notes</h3>
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: getMetafieldValue(inspection.metadata.notes) }} />
          </div>
        )}

        {inspection.metadata?.required_documents && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy-800 mb-3">📋 Required Documents</h3>
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: getMetafieldValue(inspection.metadata.required_documents) }} />
          </div>
        )}
      </div>
    </div>
  );
}