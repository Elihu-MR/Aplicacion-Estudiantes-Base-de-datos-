import axios from 'axios';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const API_BASE = "https://localhost:7109/api/Estudiantes";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  // ---------- FUNCIONES CRUD ----------
  const crearEstudiante = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Matricula", "987654");
      formData.append("Nombre", "Juan");
      formData.append("Apellido", "Pérez");
      formData.append("Edad", 20);
      formData.append("Carrera", "TI");
      formData.append("Cuatrimestre", "5to");

      const res = await axios.post(API_BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setOutput(res.data);
    } catch (error) {
      setOutput("Error al crear: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setOutput(res.data);
    } catch (error) {
      setOutput("Error al obtener todos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerUno = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/Juan`);
      setOutput(res.data);
    } catch (error) {
      setOutput("Error al obtener uno: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstudiante = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Matricula", "987654");
      formData.append("Nombre", "Juan");
      formData.append("Apellido", "Actualizado");
      formData.append("Edad", 21);
      formData.append("Carrera", "Sistemas");
      formData.append("Cuatrimestre", "6to");

      const res = await axios.put(`${API_BASE}/Juan`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setOutput(res.data);
    } catch (error) {
      setOutput("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEstudiante = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/Juan`);
      setOutput(res.data);
    } catch (error) {
      setOutput("Error al eliminar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CRUD Estudiantes</Text>

      <Button title="📥 Crear Estudiante" onPress={crearEstudiante} />
      <Button title="📄 Obtener Todos" onPress={obtenerTodos} />
      <Button title="🔍 Obtener Uno" onPress={obtenerUno} />
      <Button title="✏️ Actualizar Estudiante" onPress={actualizarEstudiante} />
      <Button title="🗑️ Eliminar Estudiante" onPress={eliminarEstudiante} />

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando...</Text>
        </View>
      )}

      {!loading && output && (
        <Text style={styles.result}>
          {typeof output === "object"
            ? JSON.stringify(output, null, 2)
            : output}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    gap: 10,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    fontFamily: "monospace",
  },
});
