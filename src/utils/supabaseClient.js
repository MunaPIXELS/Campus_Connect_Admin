import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://ulemsckmztvfjmihplmc.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZW1zY2ttenR2ZmptaWhwbG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTYxNzgsImV4cCI6MjA5MTAzMjE3OH0.yvgB0PgpYI7g0vgqWjvsf-gTyntNxLB2x2iYAeKSO-k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth utilities
export const signUpUser = async (email, password, metadata = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, data: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Profile utilities
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const suspendUser = async (userId, suspended = true) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: suspended ? 'suspended' : 'student' })
      .eq('id', userId);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteUser = async (userId) => {
  try {
    // Delete from profiles first (due to foreign key)
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    
    if (profileError) throw profileError;
    
    // Delete auth user via admin API would require service role key
    // For now, we just mark as deleted in profiles
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Search profiles
export const searchProfiles = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`full_name.ilike.%${searchTerm}%,student_number.ilike.%${searchTerm}%`);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const { data, error } = await supabase
      .from('profiles')  
      .select('*')
      .eq('role', role);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Stats
export const getProfileStats = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, role');
    
    if (error) throw error;
    
    const stats = {
      totalUsers: data.length,
      students: data.filter(p => p.role === 'student').length,
      suspended: data.filter(p => p.role === 'suspended').length,
      activeToday: data.length, // Would need activity table for real data
    };
    
    return { success: true, data: stats };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
