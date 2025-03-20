import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getPrestamos, addPrestamo, deletePrestamo } from '../services/prestamos';
import { useAuth } from '../context/AuthContext';


const PrestamosScreen = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [descripcion, setDescripcion] = useState('');
    const [deudorId, setDeudorId] = useState('');
    const [deudores, setDeudores] = useState([]);
    const [monto, setMonto] = useState('');
    const { user, users, getAllUsers } = useAuth();

    useEffect(() => {
        loadPrestamos();
        loadDeudores();
    }, []);

    const loadPrestamos = async () => {
        try {
            setLoading(true);
            const data = await getPrestamos();
            setPrestamos(data);
        } catch (error) {
            console.error('Error cargando prestamos:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadDeudores = async () => {
        try {
            setLoading(true)
            await getAllUsers();
            console.log('hay users',users)
            if (Array.isArray(users) && users.length > 0) {
                const deudoresList = users.filter(userItem => userItem.id !== user.id)
                setDeudores(deudoresList)
            }
        } catch (error) {
            console.error('Error cargando los usuarios deudores', error)
        } finally { setLoading(false); }
    }

    const handleAddPrestamo = async () => {
        if (!descripcion || !monto || !deudorId) return;

        try {
            const nuevoPrestamo = {
                prestamista_id: user.id,
                deudor_id: deudorId,
                monto: parseFloat(monto),
                fecha: new Date().toISOString(),
                estado: 'pendiente',
            };

            await addPrestamo(nuevoPrestamo);
            setDescripcion('');
            setMonto('');
            setDeudorId('');
            loadPrestamos();
        } catch (error) {
            console.error('Error añadiendo prestamo:', error);
        }
    };

    const handleDeletePrestamo = async (id) => {
        try {
            await deletePrestamo(id);
            loadPrestamos();
        } catch (error) {
            console.error('Error eliminando préstamo:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Préstamos</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Monto"
                    value={monto}
                    onChangeText={setMonto}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                />
                {/* Mostrar el deudor seleccionado */}
                <TouchableOpacity style={styles.input} onPress={() => setShowDeudorModal(true)}>
                    <Text>{deudorId ? `Deudor: ${deudores.find(d => d.id === deudorId)?.email}` : 'Seleccionar deudor'}</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Deudor"
                    value={deudorId}
                    onChangeText={setDeudorId}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddPrestamo}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>
            </View>
            {loading ? (<Text>Cargando...</Text>) : (
                <FlatList data={prestamos} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
                    <View style={styles.prestamoItem}>
                        <Text style={styles.prestamoDesc}>{item.descripcion}</Text>
                        <Text style={styles.prestamoMonto}>${item.monto.toFixed(2)}</Text>
                        <TouchableOpacity
                            onPress={() => handleDeletePrestamo(item.id)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>

                )} />)}
        </View>
    )

}
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
    prestamoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    prestamoDesc: {
        flex: 2,
    },
    prestamoMonto: {
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

export default PrestamosScreen;
