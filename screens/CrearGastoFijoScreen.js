// screens/CrearGastoScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { supabase } from '../libs/supabase';

export default function CrearGastoScreen({ navigation }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCrearGasto = async () => {
    if (!descripcion || !monto) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Validar que el monto sea un número válido
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Error', 'Por favor, ingresa un monto válido');
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('gastos_fijos')
        .insert([
          { 
            descripcion, 
            monto: montoNum,
          }
        ]);
      
      if (error) throw error;
      
      Alert.alert(
        'Éxito', 
        'Gasto fijo registrado correctamente',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo crear el gasto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Alquiler, Netflix, Luz"
            value={descripcion}
            onChangeText={setDescripcion}
            maxLength={100}
          />

          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el monto"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleCrearGasto}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar Gasto Fijo'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});