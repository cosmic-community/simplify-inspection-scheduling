import Link from 'next/link';
import { getProjects } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10">
          <div className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">Our Work</div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-3">Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl">All active and completed construction projects managed by Baltimore Permits.</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <div className="text-5xl mb-4">🏗️</div>
            <p className="text-gray-600">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all block">
                {project.metadata?.project_image ? (
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={`${project.metadata.project_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center">
                    <span className="text-6xl">🏗️</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <StatusBadge status={project.metadata?.status} />
                    {project.metadata?.permit_number && (
                      <span className="text-xs text-gray-500 font-mono">#{getMetafieldValue(project.metadata.permit_number)}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-2 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                  {project.metadata?.address && (
                    <p className="text-gray-600 text-sm mb-2">📍 {getMetafieldValue(project.metadata.address)}</p>
                  )}
                  {project.metadata?.client_name && (
                    <p className="text-sm text-gray-500">Client: {getMetafieldValue(project.metadata.client_name)}</p>
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