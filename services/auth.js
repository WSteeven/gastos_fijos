// services/auth.js
import { supabase } from '../lib/supabase';

// Registrar un nuevo usuario
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Iniciar sesión con un usuario existente
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Cerrar sesión
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Obtener el usuario actual
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}