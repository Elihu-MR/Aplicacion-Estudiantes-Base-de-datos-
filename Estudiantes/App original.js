import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-web';

const url = "https://localhost:7109/api/Estudiantes/";
const API_BASE = "https://localhost:7109/api/Estudiantes/" //parametro de matricula al final

const crearEstudiante = async (data) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    const response = await axios.post(API_BASE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log("Estudiante creado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear estudiante:", error);
  }
};

const obtenerTodosLosEstudiantes = async (param) => {
  try {
    const response = await axios.get(`${API_BASE}`);
    console.log("Estudiante encontrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiante:", error);
  }
};

const obtenerEstudiante = async (param) => {
  try {
    const response = await axios.get(`${API_BASE}/${param}`);
    console.log("Estudiante encontrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiante:", error);
  }
};

const actualizarEstudiante = async (nombre, data) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    const response = await axios.put(`${API_BASE}/${nombre}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log("Estudiante actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
  }
};

const eliminarEstudiante = async (nombre) => {
  try {
    const response = await axios.delete(`${API_BASE}/${nombre}`);
    console.log("Estudiante eliminado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
  }
};


export default function App() {

  // ---------------------------------------- Api Components ----------------------------------------
  const [estudiantes, setEstudiantes] = useState([]);// espara consumir una vez el useEffect
  const [loading, SetLoading] = useState (true);
  const [error, SetError] = useState (null);

  useEffect(() => {
    axios.get(url)
      .then( (response) => {
        console.log("Estudiantes response: ",response);

        if (response.data && response.data.items && response.data.items.length > 0) {
          setEstudiantes(response.data);
          SetLoading(false);
        } else {
          SetError('Error, No Se Cargaron Los estudiantes');
          SetLoading(false);
        }
      })
        .catch( (error) => {
          console.log(error);
        });
  } ,[]);

  console.log("Estudiantes Response API:",estudiantes);
  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text> loading... </Text>
      </View>
    );
  }

  if (error) {
    return <text> Error:{Error}</text>
  }

  // ---------------------------------------- Api Components ----------------------------------------
  return (
    <View style={styles.container}>
      <text style={styles.texttitle}> Characters</text>
      <text style={styles.texttitle}>Name - Race</text>

      <FlatList style={styles.list}
      data={characters}
      keyExtractor={ (item) => item.id.toString() }
      renderItem={ ({item}) => (
        <View style={styles.container} >
          <text style={styles.text}> {item.name} - {item.race}</text>
        </View>
      )
    }
      />
      <Text> loading... </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
  },
  text: {
    fontSize: 20,
    fontFamily: 'Arial',
    padding: 10,
    backgroundColor: "rgb(36, 5, 94)",
    margin: 5,
    borderRadius: 5,
    color: 'white'
  },
  texttitle: {
    fontSize: 25,
    fontFamily: 'Arial',
    padding: 10,
    backgroundColor: "rgb(36, 5, 94)",
    color: 'white',
    width:"20%"
  }
}
);
