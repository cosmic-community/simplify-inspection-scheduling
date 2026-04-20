import Link from 'next/link';
import { getProjects, getInspections, getInspectors } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default async function HomePage() {
  const [projects, inspections, inspectors] = await Promise.all([
    getProjects(),
    getInspections(),
    getInspectors(),
  ]);

  const upcomingInspections = inspections.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              🏗️ Baltimore's Trusted Permit Experts
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simplify Inspection <span className="text-orange-500">Scheduling</span>
            </h1>
            <p className="text-xl text-navy-100 mb-8 leading-relaxed">
              Coordinate required inspections efficiently, avoid missed deadlines and project delays. Expert permitting services with local Baltimore insight.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/inspections" className="btn-primary">
                View Inspections →
              </Link>
              <Link href="/projects" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/projects" className="bg-gradient-to-br from-navy-50 to-white border border-navy-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">🏗️</div>
              <div className="text-4xl font-bold text-navy-800 mb-1">{projects.length}</div>
              <div className="text-gray-600 font-medium">Active Projects</div>
            </Link>
            <Link href="/inspectors" className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">👷</div>
              <div className="text-4xl font-bold text-navy-800 mb-1">{inspectors.length}</div>
              <div className="text-gray-600 font-medium">Certified Inspectors</div>
            </Link>
            <Link href="/inspections" className="bg-gradient-to-br from-navy-50 to-white border border-navy-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">🔍</div>
              <div className="text-4xl font-bold text-navy-800 mb-1">{inspections.length}</div>
              <div className="text-gray-600 font-medium">Scheduled Inspections</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Inspections */}
      {upcomingInspections.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">Schedule</div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-800">Upcoming Inspections</h2>
              </div>
              <Link href="/inspections" className="text-orange-500 hover:text-orange-600 font-semibold hidden md:inline-flex items-center gap-2">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingInspections.map((inspection) => {
                const date = inspection.metadata?.scheduled_datetime
                  ? new Date(inspection.metadata.scheduled_datetime).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })
                  : 'TBD';
                return (
                  <Link key={inspection.id} href={`/inspections/${inspection.slug}`} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200 block">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-semibold">
                        {date}
                      </div>
                      <StatusBadge status={inspection.metadata?.inspection_status} />
                    </div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">{inspection.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{getMetafieldValue(inspection.metadata?.inspection_type)}</p>
                    {inspection.metadata?.project && (
                      <div className="text-sm text-gray-500 border-t border-gray-100 pt-3">
                        📍 {inspection.metadata.project.title}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">Portfolio</div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-800">Featured Projects</h2>
              </div>
              <Link href="/projects" className="text-orange-500 hover:text-orange-600 font-semibold hidden md:inline-flex items-center gap-2">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                  {project.metadata?.project_image && (
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={`${project.metadata.project_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3">
                      <StatusBadge status={project.metadata?.status} />
                    </div>
                    <h3 className="text-xl font-bold text-navy-800 mb-2 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{getMetafieldValue(project.metadata?.address)}</p>
                    {project.metadata?.client_name && (
                      <p className="text-sm text-gray-500">Client: {getMetafieldValue(project.metadata.client_name)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Streamline Your Inspections?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
            Let our Baltimore permitting experts handle the coordination so you can focus on building.
          </p>
          <Link href="/inspections" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  );
}