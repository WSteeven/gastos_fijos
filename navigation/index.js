// navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';

// Pantallas de autenticación
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Pantallas de la aplicación
import HomeScreen from '../screens/HomeScreen';
import GastosFijosScreen from '../screens/GastosFijosScreen';
import CrearGastoScreen from '../screens/CrearGastoFijoScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { user } = useAuth();

    return (
            <Stack.Navigator>
                {user ? (
                    // Rutas autenticadas
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
                        <Stack.Screen
                            name="GastosFijos"
                            component={GastosFijosScreen}
                            options={{ title: 'Gastos Fijos' }}
                        />
                        <Stack.Screen
                            name="CrearGasto"
                            component={CrearGastoScreen}
                            options={{ title: 'Crear Gasto Fijo' }}
                        />
                    </>
                ) : (
                    // Rutas no autenticadas
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ title: 'Registro' }}
                        />
                    </>
                )}
            </Stack.Navigator>
    );
}