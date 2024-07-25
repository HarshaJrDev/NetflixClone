import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.movieImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.movieTitle}>{movie.name}</Text>
        <Text style={styles.movieSummary}>
          {movie.summary
            ? movie.summary.replace(/<[^>]+>/g, '') // Remove HTML tags
            : 'No summary available'}
        </Text>
        <Text style={styles.movieInfo}><Text style={styles.infoLabel}>Type:</Text> {movie.type}</Text>
        <Text style={styles.movieInfo}><Text style={styles.infoLabel}>Language:</Text> {movie.language}</Text>
        <Text style={styles.movieInfo}><Text style={styles.infoLabel}>Genres:</Text> {movie.genres.join(', ')}</Text>
        <Text style={styles.movieInfo}><Text style={styles.infoLabel}>Status:</Text> {movie.status}</Text>
        <Text style={styles.movieInfo}><Text style={styles.infoLabel}>Rating:</Text> {movie.rating.average}</Text>
        <Text style={styles.movieInfo}><Text style={styles.infoLabel}>Premiered:</Text> {movie.premiered}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  movieImage: {
    height: 600,
    width: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: '#181818', // Darker background for a sleek look
  },
  movieTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  movieSummary: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
  },
  movieInfo: {
    color: '#bbb',
    fontSize: 16,
    marginTop: 10,
  },
  infoLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
