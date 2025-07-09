import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-web';

const url = "https://localhost:7109/api/Estudiantes";

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
