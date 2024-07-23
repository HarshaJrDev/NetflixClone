import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error(error);
        }
    };

    const renderMovie = ({ item }) => (
        <TouchableOpacity
            style={styles.movieContainer}
            onPress={() => navigation.navigate('Details', { movie: item.show,type : item.type })}
        >
            <Image source={{ uri: item.show.image?.medium }} style={styles.movieImage} />
            <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.show.name}</Text>
                <Text
                    style={styles.movieSummary}
                    numberOfLines={5}
                    ellipsizeMode="tail"
                >
                    {item.show.summary
                        ? item.show.summary.replace(/<[^>]+>/g, '')
                        : 'No summary available'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                renderItem={renderMovie}
                keyExtractor={item => item.show.id.toString()}
                contentContainerStyle={styles.listContent}
            />
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
    },
    listContent: {
        padding: 10,
    },
    movieContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 10,
        marginBottom: 20,
        marginHorizontal: 10,
        marginTop:20
    },
    movieImage: {
        height: 150,
        width: 100,
        borderRadius: 10,
    },
    movieDetails: {
        flex: 1,
        marginLeft: 10,
    },
    movieTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    movieSummary: {
        color: "#fff",
        marginTop: 5,
    },
    logo: {
        color: '#E50914', 
        fontSize: 48,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
