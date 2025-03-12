// services/prestamos.js
import { supabase } from '../lib/supabase';

// Obtener todos los préstamos
export async function getPrestamos() {
  const { data, error } = await supabase
    .from('prestamos')
    .select('*')
    .order('fecha', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Agregar un nuevo préstamo
export async function addPrestamo(prestamo) {
  const { data, error } = await supabase
    .from('prestamos')
    .insert([prestamo])
    .select();
  
  if (error) throw error;
  return data[0];
}

// Actualizar un préstamo existente
export async function updatePrestamo(id, updates) {
  const { data, error } = await supabase
    .from('prestamos')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

// Eliminar un préstamo
export async function deletePrestamo(id) {
  const { error } = await supabase
    .from('prestamos')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}x