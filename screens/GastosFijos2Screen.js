// screens/GastosFijosScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useIsFocused } from '@react-navigation/native';

export default function GastosFijosScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchGastos();
    }
  }, [isFocused]);

  async function fetchGastos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gastos_fijos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setGastos(data || []);
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudieron cargar los gastos');
    } finally {
      setLoading(false);
    }
  }

  async function deleteGasto(id) {
    try {
      const { error } = await supabase
        .from('gastos_fijos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Actualizar la lista después de eliminar
      setGastos(gastos.filter(gasto => gasto.id !== id));
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo eliminar el gasto');
    }
  }

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este gasto fijo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteGasto(id) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.gastoItem}>
      <View style={styles.gastoInfo}>
        <Text style={styles.gastoDescripcion}>{item.descripcion}</Text>
        <Text style={styles.gastoFecha}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.gastoMonto}>${item.monto.toFixed(2)}</Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
        </View>
      ) : (
        <>
          <FlatList
            data={gastos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes gastos fijos registrados</Text>
              </View>
            )}
          />
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CrearGasto')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  gastoItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  gastoInfo: {
    flex: 1,
  },
  gastoDescripcion: {
    fontSize: 16,
    fontWeight: '500',
  },
  gastoFecha: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  gastoMonto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});