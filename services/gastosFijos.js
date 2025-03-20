// services/gastosFijos.js
import { supabase } from '../libs/supabase.js'

// Obtener todos los gastos fijos
export async function getGastosFijos() {
  const { data, error } = await supabase
    .from('gastos_fijos')
    .select('*')
    .order('fecha', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Agregar un nuevo gasto fijo
export async function addGastoFijo(gastoFijo) {
  const { data, error } = await supabase
    .from('gastos_fijos')
    .insert([gastoFijo])
    .select();
  
  if (error) throw error;
  return data[0];
}

// Actualizar un gasto fijo existente
export async function updateGastoFijo(id, updates) {
  const { data, error } = await supabase
    .from('gastos_fijos')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

// Eliminar un gasto fijo
export async function deleteGastoFijo(id) {
  const { error } = await supabase
    .from('gastos_fijos')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}