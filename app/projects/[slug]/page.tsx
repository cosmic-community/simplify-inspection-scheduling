// app/projects/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const startDate = project.metadata?.start_date
    ? new Date(project.metadata.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;
  const endDate = project.metadata?.target_completion_date
    ? new Date(project.metadata.target_completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="py-12">
      <div className="container-custom max-w-5xl">
        <Link href="/projects" className="text-orange-500 hover:text-orange-600 font-semibold mb-6 inline-flex items-center gap-2">
          ← Back to Projects
        </Link>

        {project.metadata?.project_image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-gray-100">
            <img
              src={`${project.metadata.project_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusBadge status={project.metadata?.status} />
          {project.metadata?.permit_number && (
            <span className="bg-navy-100 text-navy-800 px-3 py-1 rounded-full text-sm font-mono">
              Permit #{getMetafieldValue(project.metadata.permit_number)}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">{project.title}</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10 bg-gray-50 rounded-xl p-6">
          {project.metadata?.address && (
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Address</div>
              <div className="text-navy-800 font-medium">📍 {getMetafieldValue(project.metadata.address)}</div>
            </div>
          )}
          {project.metadata?.client_name && (
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Client</div>
              <div className="text-navy-800 font-medium">{getMetafieldValue(project.metadata.client_name)}</div>
            </div>
          )}
          {startDate && (
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Start Date</div>
              <div className="text-navy-800 font-medium">{startDate}</div>
            </div>
          )}
          {endDate && (
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Target Completion</div>
              <div className="text-navy-800 font-medium">{endDate}</div>
            </div>
          )}
        </div>

        {project.metadata?.description && (
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">About This Project</h2>
            <div dangerouslySetInnerHTML={{ __html: getMetafieldValue(project.metadata.description) }} />
          </div>
        )}
      </div>
    </div>
  );
}