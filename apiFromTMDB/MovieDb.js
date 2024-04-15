//constant

import axios from "axios";
import {apiKey} from "./constant";

// Define API endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// Dynamic EndPoint
const MovieDetailsEndPoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
// using for cast from credits
const creditsEndPoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndPoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const searchMoviesEndPoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


const personDetailsEndPoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndPoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;


// fetching the images
export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallBack Moveis
export const fallBackMoviePoster = 'https://quotefancy.com/quote/1076912/Lauren-Bacall-It-s-not-an-old-movie-if-you-haven-t-seen-it'
export const fallBackPerson = 'https://www.dreamstime.com/illustration/default-profile.html'

// Define apiCall function to make API requests
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };
    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

// Export functions to fetch movie data
export const fetchTrendingMovies = async () => {
    return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = async () => {
    return apiCall(upComingMoviesEndpoint);
};

export const fetchTopRatedMovies = async () => {
    return apiCall(topRatedMoviesEndpoint);
};

export const fetchMoviesDetails = async (id) => {
    return apiCall(MovieDetailsEndPoint(id));
};

export const fetchMoviesCredits = async (id) => {
    return apiCall(creditsEndPoint(id));
};

export const fetchSimilarMovies = async (id) => {
    return apiCall(similarMoviesEndPoint(id));
};

export const fetchPersonDetails = async (id) => {
    return apiCall(personDetailsEndPoint(id));
};
export const fetchPersonMovies = async (id) => {
    return apiCall(personMoviesEndPoint(id));
};

export const fetchSearchMovies = params => {
    // Make the API call to search for movies based on the provided query
    try {

        return apiCall(searchMoviesEndPoint, params); // Assuming the response contains the data you need
    } catch (error) {
        console.error('Error fetching search movies:', error);
        throw error; // Propagate the error to the caller
    }
}
