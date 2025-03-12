// screens/GastosFijosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getGastosFijos, addGastoFijo, deleteGastoFijo } from '../services/gastosFijos';

const GastosFijosScreen = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  useEffect(() => {
    loadGastos();
  }, []);

  const loadGastos = async () => {
    try {
      setLoading(true);
      const data = await getGastosFijos();
      setGastos(data);
    } catch (error) {
      console.error('Error cargando gastos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGasto = async () => {
    if (!descripcion || !monto) return;
    
    try {
      const nuevoGasto = {
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date().toISOString(),
      };
      
      await addGastoFijo(nuevoGasto);
      setDescripcion('');
      setMonto('');
      loadGastos();
    } catch (error) {
      console.error('Error añadiendo gasto:', error);
    }
  };

  const handleDeleteGasto = async (id) => {
    try {
      await deleteGastoFijo(id);
      loadGastos();
    } catch (error) {
      console.error('Error eliminando gasto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos Fijos</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={styles.input}
          placeholder="Monto"
          value={monto}
          onChangeText={setMonto}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddGasto}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={gastos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.gastoItem}>
              <Text style={styles.gastoDesc}>{item.descripcion}</Text>
              <Text style={styles.gastoMonto}>${item.monto.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteGasto(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  gastoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  gastoDesc: {
    flex: 2,
  },
  gastoMonto: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#ff6666',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default GastosFijosScreen;