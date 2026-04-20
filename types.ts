export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    project_name?: string;
    address?: string;
    description?: string;
    client_name?: string;
    status?: string;
    start_date?: string;
    target_completion_date?: string;
    permit_number?: string;
    project_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Inspector extends CosmicObject {
  type: 'inspectors';
  metadata: {
    full_name?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    specialties?: string[];
    email?: string;
    phone?: string;
    bio?: string;
    certifications?: string;
  };
}

export interface Inspection extends CosmicObject {
  type: 'inspections';
  metadata: {
    inspection_type?: string;
    scheduled_datetime?: string;
    project?: Project;
    assigned_inspector?: Inspector;
    inspection_status?: string;
    priority?: string;
    notes?: string;
    required_documents?: string;
  };
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}