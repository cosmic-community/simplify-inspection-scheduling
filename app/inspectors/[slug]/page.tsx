// app/inspectors/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInspector } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';

export default async function InspectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inspector = await getInspector(slug);

  if (!inspector) notFound();

  return (
    <div className="py-12">
      <div className="container-custom max-w-5xl">
        <Link href="/inspectors" className="text-orange-500 hover:text-orange-600 font-semibold mb-6 inline-flex items-center gap-2">
          ← Back to Inspectors
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 sticky top-24">
              {inspector.metadata?.photo ? (
                <img
                  src={`${inspector.metadata.photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={inspector.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-8xl">👷</div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Certified Inspector
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">
              {getMetafieldValue(inspector.metadata?.full_name) || inspector.title}
            </h1>

            {inspector.metadata?.specialties && inspector.metadata.specialties.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {inspector.metadata.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {inspector.metadata?.bio && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">About</h3>
                <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: getMetafieldValue(inspector.metadata.bio) }} />
              </div>
            )}

            {inspector.metadata?.certifications && (
              <div className="mb-6 bg-navy-50 rounded-xl p-5">
                <h3 className="text-sm uppercase tracking-wider text-navy-600 font-semibold mb-2">Certifications</h3>
                <div className="text-navy-800" dangerouslySetInnerHTML={{ __html: getMetafieldValue(inspector.metadata.certifications) }} />
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-5">
              {inspector.metadata?.email && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Email</div>
                  <a href={`mailto:${getMetafieldValue(inspector.metadata.email)}`} className="text-orange-500 hover:text-orange-600 font-medium break-all">
                    {getMetafieldValue(inspector.metadata.email)}
                  </a>
                </div>
              )}
              {inspector.metadata?.phone && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Phone</div>
                  <a href={`tel:${getMetafieldValue(inspector.metadata.phone)}`} className="text-orange-500 hover:text-orange-600 font-medium">
                    {getMetafieldValue(inspector.metadata.phone)}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}