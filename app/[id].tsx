import { View, Text, ActivityIndicator, StyleSheet, Image, Pressable } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMovieDetails } from '@/api/movies'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { addMovieToWatchList } from '@/api/watchlist'

const MovieListDetails = () => {
    const { id } = useLocalSearchParams()
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    const client = useQueryClient()

    const movieId = Array.isArray(id) ? id[0] : id;
    const { data, isLoading, error } = useQuery({
        queryKey: ['movies', movieId],
        queryFn: () => fetchMovieDetails(movieId)
    })

    const { mutate } = useMutation({
        mutationFn: () => addMovieToWatchList(movieId),
        onSuccess: (response) => {
            if (response.success) {
                setIsInWatchlist(true);
            }
            client.invalidateQueries(['watchlist'])
        },
    })

    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>{error.message}</Text>
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}` }} style={{ width: '100%', height: 300 }} />
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{data.original_title}</Text>
                <View style={styles.watchlistContainer}>
                    <Text style={styles.innerHeading}>Add to Watchlist</Text>
                    <Pressable onPress={() => mutate()}>
                        <FontAwesome6
                            name={isInWatchlist ? "bookmark" : "bookmark"}
                            solid={isInWatchlist} size={24} color="black" />
                    </Pressable>
                </View>

                <Text style={styles.innerHeading}>Overview</Text>
                <Text style={styles.overview}>{data.overview}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        paddingHorizontal: 13,
    },
    watchlistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        padding: 5,
    },
    overview: {
        fontSize: 14,
        padding: 3,
    },
    innerHeading: {
        fontSize: 16,
        fontWeight: '600',
        padding: 5,
    }
})

export default MovieListDetails