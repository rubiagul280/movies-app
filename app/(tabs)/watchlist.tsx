import { StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import MovieListItem from '@/components/MovieListItem';
import { StatusBar } from 'expo-status-bar';
import { fetchMovieWatchlist } from '@/api/watchlist';

export default function Watchlist() {
  const {data: watchlist, isLoading, error} = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchMovieWatchlist,
  })

  if (isLoading) {
    return <ActivityIndicator color={"red"} size={"large"} />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar />
      <ThemedView style={styles.titleContainer}>
        {/* <Text style={styles.heading}>Movies</Text> */}
        <FlatList
          data={watchlist}
          numColumns={2}
          contentContainerStyle={{gap: 5}}
          columnWrapperStyle={{gap: 5}}
          renderItem={({ item }) => (
            <MovieListItem movie={item}/>
          )}

        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    gap: 8,
    flex: 1,
    paddingHorizontal: 13,
    paddingTop: 30,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
