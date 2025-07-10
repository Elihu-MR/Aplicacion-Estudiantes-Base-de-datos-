import axios from 'axios';
import { useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const API_BASE = "https://localhost:7109/api/Estudiantes";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [get, setGet] = useState("Repuesta de la API");

  const [matriculaGet, setMatriculaGet] = useState("");
  const [matriculaDelete, setMatriculaDelete] = useState("");

  const [matriculaPost, setMatriculaPost] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");

  const [matriculaPut, setMatriculaPut] = useState("");
  const [nombrePut, setNombrePut] = useState("");
  const [apellidoPut, setApellidoPut] = useState("");
  const [edadPut, setEdadPut] = useState("");
  const [carreraPut, setCarreraPut] = useState("");
  const [cuatrimestrePut, setCuatrimestrePut] = useState("");
  

  

  // ---------- FUNCIONES CRUD ----------
  const crearEstudiante = async (matricula, nombre, apellido, edad, carrera, cuatrimestre) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Matricula", matricula);
      formData.append("Nombre", nombre);
      formData.append("Apellido", apellido);
      formData.append("Edad", edad);
      formData.append("Carrera", carrera);
      formData.append("Cuatrimestre", cuatrimestre);

      const res = await axios.post(API_BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(JSON.stringify(res.data.message));
    } catch (error) {
      alert("Error al crear: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtener = async (matricula) => {
    var res;
    setLoading(true);
      
    try {
      if(matricula != ""){
        res = await axios.get(API_BASE + `/${matricula}`);
      } else {
        res = await axios.get(API_BASE);
      }
      //setOutput(res.data);
      alert("Resultados Obtenidos");
      console.log(res.data);
      setGet(JSON.stringify(res.data));

    } catch (error) {
      alert("Error al obtener los datos:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstudiante = async (matricula, nombre, apellido, edad, carrera, cuatrimestre) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Matricula", matricula);
      formData.append("Nombre", nombre);
      formData.append("Apellido", apellido);
      formData.append("Edad", edad);
      formData.append("Carrera", carrera);
      formData.append("Cuatrimestre", cuatrimestre);

      const res = await axios.put(`${API_BASE}/${matricula}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(JSON.stringify(res.data.message));
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEstudiante = async (matricula) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/${matricula}`);
      alert(JSON.stringify(res.data.message));
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.Maintitle}>CRUD Estudiantes</Text>

      <View style={styles.content}>
        {/* ------------------------------- Create ------------------------------- */}
        <View style={styles.crud}>
                <TextInput placeholder='Matricula' value={matriculaPost} onChangeText={setMatriculaPost} style={styles.input} placeholderTextColor="#666"/>
                <TextInput placeholder='Nombre' value={nombre} onChangeText={setNombre} style={styles.input} placeholderTextColor="#666" />
                <TextInput placeholder='Apellido' value={apellido} onChangeText={setApellido} style={styles.input} placeholderTextColor="#666" />
                <TextInput placeholder='Edad' value={edad} onChangeText={setEdad} style={styles.input} placeholderTextColor="#666" />
                <TextInput placeholder='Carrera' value={carrera} onChangeText={setCarrera} style={styles.input} placeholderTextColor="#666" />
                <TextInput placeholder='Cuatrimestre' value={cuatrimestre} onChangeText={setCuatrimestre} style={styles.input} placeholderTextColor="#666"/>
          <Button title="Crear Estudiante" onPress={ ()=> { crearEstudiante(matriculaPost, nombre, apellido, edad, carrera, cuatrimestre) }  } placeholderTextColor="#666" />
        </View>

        {/* ------------------------------- Read ------------------------------- */}
        <View style={styles.crud2}>
          <TextInput placeholder='Matricula' value={matriculaGet} onChangeText={setMatriculaGet} style={styles.input} placeholderTextColor="#666" />
          <Text style={styles.input}> {get} </Text>
          <Button title="Obtener" onPress={ ()=> { obtener(matriculaGet) } }  />
        </View>

        {/* ------------------------------- Update ------------------------------- */}
        <View style={styles.crud}>
          <TextInput placeholder='Matricula' value={matriculaPut} onChangeText={setMatriculaPut} style={styles.input} placeholderTextColor="#666"/>
          <TextInput placeholder='Nombre' value={nombrePut} onChangeText={setNombrePut} style={styles.input} placeholderTextColor="#666" />
          <TextInput placeholder='Apellido' value={apellidoPut} onChangeText={setApellidoPut} style={styles.input} placeholderTextColor="#666" />
          <TextInput placeholder='Edad' value={edadPut} onChangeText={setEdadPut} style={styles.input} placeholderTextColor="#666" />
          <TextInput placeholder='Carrera' value={carreraPut} onChangeText={setCarreraPut} style={styles.input} placeholderTextColor="#666" />
          <TextInput placeholder='Cuatrimestre' value={cuatrimestrePut} onChangeText={setCuatrimestrePut} style={styles.input} placeholderTextColor="#666"/>
          <Button title="Actualizar Estudiante" onPress={ ()=> { actualizarEstudiante(matriculaPut, nombrePut, apellidoPut, edadPut, carreraPut, cuatrimestrePut) }  } />
        </View>

        {/* ------------------------------- Delete ------------------------------- */}
        <View style={styles.crud}>
          <TextInput placeholder='Matricula' value={matriculaDelete} onChangeText={setMatriculaDelete} style={styles.input} placeholderTextColor="#666"/>
          <Button title="Eliminar Estudiante" onPress={ ()=> { eliminarEstudiante(matriculaDelete) } } />
        </View>
      </View>

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    gap: 10,
    height: "100%",
    paddingBottom: 100,
  },
  content: {
    width: "100%",
    height: 100,
//    backgroundColor:"rgb(43, 255, 0)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  crud: {
    width: "20%",
    height: 20,
//    backgroundColor:"rgb(161, 161, 161)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  crud2: {
    width: "40%",
    height: 20,
//    backgroundColor:"rgb(161, 161, 161)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  Maintitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "95%",
    margin: 5,
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    backgroundColor: "rgb(212, 212, 212)",
  },
  result: {
    marginTop: "20%",
    padding: 10,
    width: "100%",
    fontFamily: "monospace",
  },
});
