import { ContactMessage } from '@/types/portfolio';
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase/client';

let localMessages: ContactMessage[] = [];

export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>
): Promise<ContactMessage> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data: msg, error } = await supabase
      .from('contact_messages')
      .insert({ ...data, is_read: false })
      .select()
      .single();

    if (error) {
      console.error('[Supabase submitContactMessage] Error:', error.message);
      throw error;
    }
    return msg as ContactMessage;
  }

  const newMsg: ContactMessage = {
    ...data,
    id: `msg-${Date.now()}`,
    is_read: false,
    created_at: new Date().toISOString(),
  };
  localMessages.push(newMsg);
  return newMsg;
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as ContactMessage[];
      }
    } catch (err) {
      console.warn('[Supabase contact_messages] Fallback lokal aktif:', err);
    }
  }

  return localMessages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function markMessageRead(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('[Supabase markMessageRead] Error:', error.message);
      throw error;
    }
    return;
  }

  const msg = localMessages.find((m) => m.id === id);
  if (msg) msg.is_read = true;
}

export async function deleteMessage(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Supabase deleteMessage] Error:', error.message);
      throw error;
    }
    return;
  }

  localMessages = localMessages.filter((m) => m.id !== id);
}
