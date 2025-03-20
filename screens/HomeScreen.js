// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.headerUserText}> {user?.email}</Text>
      <View style={styles.header}>
        <Text style={styles.welcomeText}></Text>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Gestiona tus finanzas</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('GastosFijos')}
        >
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>💰</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Gastos Fijos</Text>
            <Text style={styles.menuDescription}>Gestiona tus gastos recurrentes</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() =>  navigation.navigate('Prestamos')}
        >
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>💸</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Préstamos</Text>
            <Text style={styles.menuDescription}>Administra tus préstamos</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerUserText: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor:'#fff',
    textAlign:'right'
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    padding: 8,
    // backgroundColor: '#f2f2f2',
    backgroundColor:'#e61a75',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
  },
  menuContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuIcon: {
    backgroundColor: '#e6f7ff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuDescription: {
    color: '#666',
  },
});