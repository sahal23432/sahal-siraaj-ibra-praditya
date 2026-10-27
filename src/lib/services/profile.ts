import { Profile, Journey, Skill } from '@/types/portfolio';
import { SEED_PROFILE, SEED_JOURNEYS, SEED_SKILLS } from '@/lib/db/seed-data';
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase/client';

let localProfile: Profile = { ...SEED_PROFILE } as Profile;
let localJourneys: Journey[] = [...SEED_JOURNEYS] as Journey[];
let localSkills: Skill[] = [...SEED_SKILLS] as Skill[];

export async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (!error && data) {
        return data as Profile;
      }

      if (error) {
        console.warn('[Supabase profile] Fallback lokal aktif:', error.message);
      }
    } catch (err) {
      console.warn('[Supabase profile] Eksepsi koneksi, fallback lokal:', err);
    }
  }

  return localProfile;
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('profile')
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      console.error('[Supabase updateProfile] Error:', error.message);
      throw error;
    }
    return data as Profile;
  }

  localProfile = { ...localProfile, ...updates };
  return localProfile;
}

export async function getJourneys(): Promise<Journey[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('journeys')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Journey[];
      }
    } catch (err) {
      console.warn('[Supabase journeys] Fallback lokal:', err);
    }
  }

  return localJourneys.sort((a, b) => a.display_order - b.display_order);
}

export async function createJourney(journey: Omit<Journey, 'id'>): Promise<Journey> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('journeys')
      .insert(journey)
      .select()
      .single();

    if (error) {
      console.error('[Supabase createJourney] Error:', error.message);
      throw error;
    }
    return data as Journey;
  }

  const newJourney: Journey = {
    ...journey,
    id: `journey-${Date.now()}`,
  };
  localJourneys.push(newJourney);
  return newJourney;
}

export async function updateJourney(id: string, updates: Partial<Journey>): Promise<Journey> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('journeys')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Supabase updateJourney] Error:', error.message);
      throw error;
    }
    return data as Journey;
  }

  const idx = localJourneys.findIndex((j) => j.id === id);
  if (idx === -1) throw new Error('Data perjalanan tidak ditemukan');
  localJourneys[idx] = { ...localJourneys[idx], ...updates };
  return localJourneys[idx];
}

export async function deleteJourney(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { error } = await supabase.from('journeys').delete().eq('id', id);
    if (error) {
      console.error('[Supabase deleteJourney] Error:', error.message);
      throw error;
    }
    return;
  }

  localJourneys = localJourneys.filter((j) => j.id !== id);
}

export async function getSkills(): Promise<Skill[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Skill[];
      }
    } catch (err) {
      console.warn('[Supabase skills] Fallback lokal:', err);
    }
  }

  return localSkills.sort((a, b) => a.display_order - b.display_order);
}

export async function createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('skills')
      .insert(skill)
      .select()
      .single();

    if (error) {
      console.error('[Supabase createSkill] Error:', error.message);
      throw error;
    }
    return data as Skill;
  }

  const newSkill: Skill = {
    ...skill,
    id: `skill-${Date.now()}`,
  };
  localSkills.push(newSkill);
  return newSkill;
}

export async function updateSkill(id: string, updates: Partial<Skill>): Promise<Skill> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Supabase updateSkill] Error:', error.message);
      throw error;
    }
    return data as Skill;
  }

  const idx = localSkills.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error('Skill tidak ditemukan');
  localSkills[idx] = { ...localSkills[idx], ...updates };
  return localSkills[idx];
}

export async function deleteSkill(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) {
      console.error('[Supabase deleteSkill] Error:', error.message);
      throw error;
    }
    return;
  }

  localSkills = localSkills.filter((s) => s.id !== id);
}
