import { StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { fetchTopRatedMovies } from '@/api/movies';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieListItem from '@/components/MovieListItem';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const {data, isLoading, error, fetchNextPage} = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({pageParam}) => fetchTopRatedMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  })

  if (isLoading) {
    return <ActivityIndicator color={"red"} size={"large"} />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  const movies = data?.pages.flat();

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar />
      <ThemedView style={styles.titleContainer}>
        {/* <Text style={styles.heading}>Movies</Text> */}
        <FlatList
          data={movies}
          numColumns={2}
          contentContainerStyle={{gap: 5}}
          columnWrapperStyle={{gap: 5}}
          renderItem={({ item }) => (
            <MovieListItem movie={item}/>
          )}
          onEndReached={() => {
            fetchNextPage();
          }}

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
