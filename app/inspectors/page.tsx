import Link from 'next/link';
import { getInspectors } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';

export default async function InspectorsPage() {
  const inspectors = await getInspectors();

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10">
          <div className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">Our Team</div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-3">Certified Inspectors</h1>
          <p className="text-lg text-gray-600 max-w-2xl">Meet our team of experienced, certified inspection professionals serving the Baltimore area.</p>
        </div>

        {inspectors.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <div className="text-5xl mb-4">👷</div>
            <p className="text-gray-600">No inspectors available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspectors.map((inspector) => (
              <Link key={inspector.id} href={`/inspectors/${inspector.slug}`} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all block">
                <div className="aspect-square bg-gradient-to-br from-navy-700 to-navy-900 overflow-hidden">
                  {inspector.metadata?.photo ? (
                    <img
                      src={`${inspector.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                      alt={inspector.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">👷</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-800 mb-1 group-hover:text-orange-500 transition-colors">
                    {getMetafieldValue(inspector.metadata?.full_name) || inspector.title}
                  </h3>
                  {inspector.metadata?.specialties && inspector.metadata.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {inspector.metadata.specialties.slice(0, 3).map((specialty, idx) => (
                        <span key={idx} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}