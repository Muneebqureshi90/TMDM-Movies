import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronDoubleLeftIcon, ChevronLeftIcon} from "react-native-heroicons/outline";
import {styles, theme} from "../theme";
import {HeartIcon} from "react-native-heroicons/solid";
import {LinearGradient} from "expo-linear-gradient";
import Cast from "../components/movieScreen/Cast";
import MovieLists from "../components/homeScreen/moviesList/MovieLists";
import Loading from "../components/loading/Loading";
import {
    fallBackMoviePoster,
    fetchMoviesCredits,
    fetchMoviesDetails,
    fetchSimilarMovies,
    image500
} from "../apiFromTMDB/MovieDb";

var {width, height} = Dimensions.get('window');

const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-5';


const MovieScreen = () => {

    let movieName = 'Baahubali 2'


    const navigate = useNavigation();
    const handleOnChange = () => {
        // Add your logic here
        console.log('Return to home clicked');
        navigate.goBack();
    };

    // loading from loading file
    const [loading, setLoading] = useState(false)

    // For getting the data from Home Screen
    const {params: item} = useRoute()
    useEffect(() => {
        // call the api for fetching the moives data
        // console.log('itemID', item.id);
        setLoading(true)
        getMoviesDetails(item.id)
        getMoviesCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMoviesDetails = async id => {
        const data = await fetchMoviesDetails(id);
        // console.log(data, 'moveis Detsila')
        if (data) setMovies(data)
        setLoading(false)
    }

    const getMoviesCredits = async id => {
        const data = await fetchMoviesCredits(id);
        // console.log(data, 'moveis Detsila')
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        // console.log(data, 'moveis Detsila')
        if (data && data.results) setSimilarMovies(data.results)
        setLoading(false)
    }

    // after fetching movies details
    const [movie, setMovies] = useState({})
    // for Heart Icon functional
    const [isFavourite, toggleFavourite] = useState(false);
    const handlePress = () => {
        toggleFavourite(!isFavourite);
    };

    // cast
    const [cast, setCast] = useState([]);
    // movies simiplarlist
    const [similarMovies, setSimilarMovies] = useState([]);

    return (

        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className={'flex-1 bg-neutral-900'}
        >
            {/*    backButton*/}
            <View className={'w-full'}>

                <SafeAreaView className={ios ? 'mt-10' : 'mt-6'}>
                    <View className={'absolute z-20 w-full flex-row justify-between items-center px-4'}>
                        <TouchableOpacity onPress={handleOnChange} className={'rounded-xl p-1 bg-amber-500'}>
                            <ChevronLeftIcon size={'28'} strokeWidth={2.5} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePress}>
                            <HeartIcon size={35} color={isFavourite ? theme.background : "white"}/>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
                {/*    movie Poster*/}

                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <View className={'mt-10'}>
                            <Image
                                // source={require('../components/homeScreen/carousalimages/wc1763268-bollywood-wallpaper-2017.jpg')
                                // source={require('../components/homeScreen/carousalimages/wp4252982-bollywood-movies-wallpapers.jpg')
                                source={{uri: image500(movie?.poster_path) || fallBackMoviePoster}}

                                style={{width, height: height * 0.55}}/>
                            {/*    using expo colour gratiednt*/}
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{width, height: height * 0.5}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                                className={'absolute bottom-8'}
                            />

                        </View>
                    )
                }


            </View>
            {/*Movie Details*/}
            <View style={{marginTop: 0}} className={'space-y-3'}>

                {/*    Title*/}
                <Text className={'text-white text-3xl text-center font-bold tracking-wider'}>
                    {movie?.title}
                </Text>
                {/*    status , relasedate ,runtime*/}
                {
                    movie?.id ? (
                        <Text className={'text-neutral-600 font-semibold text-base text-center'}>
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime}min
                        </Text>
                    ) : null
                }

                {/*    genres*/}
                <View className={'flex-row justify-center mx-4 space-x-2'}>
                    {
                        movie?.genres?.map((genre, index) => {
                            const showDot = index !== movie.genres.length - 1; // Corrected logic

                            return (
                                <Text key={index} className={'text-neutral-400 font-semibold text-base text-center'}>
                                    {
                                        genre?.name
                                    }
                                    {showDot && '  •'} {/* Render dot only if it's not the last genre */}
                                </Text>
                            )
                        })
                    }

                    {/*<Text className={'text-neutral-400 font-semibold text-base text-center'}>*/}
                    {/*    Thrill •*/}
                    {/*</Text>*/}
                    {/*<Text className={'text-neutral-400 font-semibold text-base text-center'}>*/}
                    {/*    Comedy*/}
                    {/*</Text>*/}
                </View>
                {/*    decription*/}


                {/*<Text className={'text-neutral-400 mx-4 tracking-wider'}>*/}
                {/*    Details:*/}
                {/*    {"\n\n"}*/}
                {/*    Release Year: 2017*/}
                {/*    {"\n"}*/}
                {/*    Duration: Approximately 170 minutes*/}
                {/*    {"\n"}*/}
                {/*    Genre: Action, Drama, Fantasy*/}
                {/*    {"\n"}*/}
                {/*    Language: Telugu, Tamil (dubbed versions available in other languages)*/}
                {/*    {"\n"}*/}
                {/*    Director: S.S. Rajamouli*/}
                {/*    {"\n"}*/}
                {/*    Cast: Prabhas, Rana Daggubati, Anushka Shetty, Tamannaah, Ramya Krishna, Sathyaraj, Nassar*/}
                {/*    {"\n"}*/}
                {/*    Plot Summary: Baahubali 2: The Conclusion is the second installment in the epic Indian film series directed by S.S. Rajamouli. The movie continues the story of Amarendra Baahubali and his son Mahendra Baahubali as they fight against the tyrant king Bhallaladeva to reclaim the throne of Mahishmati and fulfill their destiny. The film explores themes of power, destiny, and sacrifice, and features spectacular action sequences and visual effects.*/}
                {/*</Text>*/}

                <Text className={'text-neutral-400 mx-4 tracking-wider'}>
                    {/*Plot Summary:*/}
                    {/*{"\n"}*/}
                    {/*Baahubali 2:*/}
                    {/*{"\n"}*/}
                    {/*The Conclusion is the second installment in the epic Indian film series directed by S.S. Rajamouli.*/}
                    {/*The movie continues the story of Amarendra Baahubali and his son Mahendra Baahubali as they fight*/}
                    {/*against the tyrant king Bhallaladeva to reclaim the throne of Mahishmati and fulfill their destiny.*/}
                    {/*The film explores themes of power, destiny, and sacrifice, and features spectacular action sequences*/}
                    {/*and visual effects.*/}
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {/*Cast*/}
            <Cast cast={cast}/>

            {/*    Similar MOvies*/}
            <MovieLists title={'SimilarMovies'} hideSeeAll={true} data={similarMovies}/>
        </ScrollView>

    );
};

export default MovieScreen;
