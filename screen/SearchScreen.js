import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [search, setsearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const searchMovies = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    }
  };
  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('Details', { movie: item.show })}
    >
      <Image source={{ uri: item.show.image?.medium }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.show.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#999"
          value={search}
          onChangeText={(text) => setsearch(text)}
          onSubmitEditing={searchMovies}
        />
        <Feather name="search" size={24} color="#fff" onPress={searchMovies} />
      </View>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.show.id.toString()}
          contentContainerStyle={styles.listContent}
          numColumns={3} // Adjust the number of columns for a grid layout
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  listContent: {
    padding: 10,
  },
  movieContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: 'hidden',
  },
  movieImage: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  movieTitle: {
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
