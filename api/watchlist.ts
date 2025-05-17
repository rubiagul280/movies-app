import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDFlNjhiMmViNzhjY2ZjNzZjNDgzZDVhZTE2MDExMSIsIm5iZiI6MTc0NjQ1NTc0NC4xNjksInN1YiI6IjY4MThjY2MwMTVjOTEwMmQyMDA4YTYzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e6a86CFM9rjZI7ntcCVQ-EH5Ou6ug33JCzBQfynLQ3o'; // Store API key in environment variables
const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
}
export const addMovieToWatchList = async (movieId: string) => {
    try {
        const API_URL = 'https://api.themoviedb.org/3/account/21991792/watchlist';

        const response = await axios.post(API_URL, 
            {media_type: 'movie', media_id: movieId, watchlist: true},
            {headers},
        );

        console.log('Add to Watch list:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error: ', error)
        return error;
    }
};

export const fetchMovieWatchlist = async () => {
    try {
        const API_URL = `https://api.themoviedb.org/3/account/21991792/watchlist/movies`

        const response = await axios.get(API_URL, {
            params: {
                language: 'en-US',
                page: 1,
            },
            headers,
        });
        return response.data.results;
    } catch(error) {
        console.log('Error: ', error)
        return error;
    }
};