import { Project } from '@/types/portfolio';
import { SEED_PROJECTS } from '@/lib/db/seed-data';
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase/client';

let localProjects: Project[] = [...SEED_PROJECTS] as Project[];

export async function getAllProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('[Supabase projects] Gagal mengambil data, menggunakan fallback lokal:', error.message);
        return localProjects.filter((p) => p.published).sort((a, b) => a.display_order - b.display_order);
      }

      if (data && data.length > 0) {
        return data as Project[];
      }
    } catch (err) {
      console.warn('[Supabase projects] Eksepsi koneksi, fallback lokal aktif:', err);
    }
  }

  return localProjects.filter((p) => p.published).sort((a, b) => a.display_order - b.display_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return data as Project;
      }
    } catch (err) {
      console.warn('[Supabase project slug] Fallback lokal aktif:', err);
    }
  }

  return localProjects.find((p) => p.slug === slug) ?? null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) {
      console.error('[Supabase createProject] Error:', error.message);
      throw error;
    }
    return data as Project;
  }

  const newProject = {
    ...project,
    id: `local-${Date.now()}`,
  } as Project;

  localProjects.push(newProject);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Supabase updateProject] Error:', error.message);
      throw error;
    }
    return data as Project;
  }

  const idx = localProjects.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Karya tidak ditemukan di penyimpanan lokal.');
  localProjects[idx] = { ...localProjects[idx], ...updates };
  return localProjects[idx];
}

export async function deleteProject(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      console.error('[Supabase deleteProject] Error:', error.message);
      throw error;
    }
    return;
  }

  localProjects = localProjects.filter((p) => p.id !== id);
}
