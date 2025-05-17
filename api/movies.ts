import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDFlNjhiMmViNzhjY2ZjNzZjNDgzZDVhZTE2MDExMSIsIm5iZiI6MTc0NjQ1NTc0NC4xNjksInN1YiI6IjY4MThjY2MwMTVjOTEwMmQyMDA4YTYzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e6a86CFM9rjZI7ntcCVQ-EH5Ou6ug33JCzBQfynLQ3o'; // Store API key in environment variables
const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
}
export const fetchTopRatedMovies = async (page: number) => {
    try {
        console.log('Calling api ...')
        const API_URL = 'https://api.themoviedb.org/3/movie/top_rated';

        const response = await axios.get(API_URL, {
            params: {
                language: 'en-US',
                page,
            },
            headers,
        });
        return response.data.results;
    } catch (error) {
        console.log('Error: ', error)
        return error;
    }
};

export const fetchMovieDetails = async (id: string) => {
    try {
        const API_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`

        const response = await axios.get(API_URL, {
            params: {
                language: 'en-US',
            },
            headers,
        });
        return response.data;
    } catch(error) {
        console.log('Error: ', error)
        return error;
    }
}

