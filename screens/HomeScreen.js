import {Text, View, Platform, TouchableOpacity, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {styles} from "../theme";
import TrendingMovies from "../components/homeScreen/carousal/TrendingMovies";
import MovieLists from "../components/homeScreen/moviesList/MovieLists";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading/Loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../apiFromTMDB/MovieDb";

const ios = Platform.OS === 'ios';
export default function HomeScreen() {

    // for carsule
    const [trending, setTrending] = useState([]);

    // for upcoming
    const [upcomping, setUpcomping] = useState([])
    const [topRated, setTopRated] = useState([])
    const navigation = useNavigation();

    // seacrh Screen
    const handleOnClick = () => {
        navigation.navigate('Search')
    }

    // loading from loading file
    // const [loading, setLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    // fetching data from apis
    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        setLoading(true)

    }, []);

    const getTrendingMovies=async ()=>{
        const data= await fetchTrendingMovies();
        // console.log('Getting the trending movies:',data)
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }

    const getUpcomingMovies=async ()=>{
        const data= await fetchUpcomingMovies();
        // console.log('Getting the upcoming movies:',data,'Getting the upcoming movies:')
        if (data && data.results) setUpcomping(data.results);
        setLoading(false)
    }
    const getTopRatedMovies=async ()=>{
        const data= await fetchTopRatedMovies();
        // console.log('Getting the trending movies:',data)
        if (data && data.results) setTopRated(data.results);
        setLoading(false)
    }

    return (
        <View className={'flex-1 bg-neutral-800'}>
            {/*<Text>Home Screen</Text>*/}
            {/*Seacrh Bar Logo*/}
            <SafeAreaView className={ios ? '-mb-2' : 'mt-2'}>
                <StatusBar style={'light'}/>
                <View className={'flex-row justify-between items-center mx-4'}>
                    <Bars3CenterLeftIcon size={'30'} strokeWidth={2} color={'white'}/>

                    <Text className={'text-white text-3xl font-bold'}>
                        <Text style={styles.text}>
                            M
                        </Text>
                        ovies
                    </Text>
                    <TouchableOpacity onPress={handleOnClick}>
                        <MagnifyingGlassIcon size={'30'} strokeWidth={2} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading/>
                ) : (
                    /*    SCroll  View*/
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}>
                        {/*    Trending Movies carsole*/}
                        {trending.length>0 && <TrendingMovies data={trending}/>}

                        {/*    upcomping movies*/}
                        {upcomping.length > 0 ? (
                            <MovieLists title={'Upcoming'} data={upcomping} />
                        ) : (
                            <Text>No upcoming movies</Text>
                        )}
                        {/*    TopReated*/}
                        {topRated.length>0 &&<MovieLists title={'TopRated'} data={topRated}/>}

                    </ScrollView>
                )
            }


        </View>
    )
        ;
}

