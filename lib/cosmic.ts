import { createBucketClient } from '@cosmicjs/sdk';
import { Project, Inspector, Inspection, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Project[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch projects');
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .depth(1);
    return response.object as Project;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch project');
  }
}

export async function getInspectors(): Promise<Inspector[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'inspectors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Inspector[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch inspectors');
  }
}

export async function getInspector(slug: string): Promise<Inspector | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'inspectors', slug })
      .depth(1);
    return response.object as Inspector;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch inspector');
  }
}

export async function getInspections(): Promise<Inspection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'inspections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    const inspections = response.objects as Inspection[];
    return inspections.sort((a, b) => {
      const dateA = new Date(a.metadata?.scheduled_datetime || '').getTime();
      const dateB = new Date(b.metadata?.scheduled_datetime || '').getTime();
      return dateA - dateB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch inspections');
  }
}

export async function getInspection(slug: string): Promise<Inspection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'inspections', slug })
      .depth(1);
    return response.object as Inspection;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch inspection');
  }
}