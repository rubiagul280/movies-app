import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface Movie {
    id: string,
    title: string,
    poster_path: string,
}

const MovieListItem = ({ movie }: { movie: Movie }) => {
    return (
        <Link href={`/${movie.id}`} asChild>
            <TouchableOpacity activeOpacity={0.8} style={styles.container} >
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={{ width: '100%', aspectRatio: 3 / 5, borderRadius: 20 }} />
                <Text style={styles.title}>{movie.title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        maxWidth: '80%',
    }
})

export default MovieListItem