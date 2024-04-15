import {Text, View, Platform, TouchableOpacity, ScrollView, Dimensions, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import {Bars3CenterLeftIcon, ChevronLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {styles, theme} from "../theme";
import TrendingMovies from "../components/homeScreen/carousal/TrendingMovies";
import MovieLists from "../components/homeScreen/moviesList/MovieLists";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRoute} from "@react-navigation/native";
import {HeartIcon} from "react-native-heroicons/solid";
import Loading from "../components/loading/Loading";
import {fallBackPerson, fetchPersonDetails, fetchPersonMovies, image342} from "../apiFromTMDB/MovieDb";

var {width, height} = Dimensions.get('window');

const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-5';
export default function PersonScreen() {

    // person dimy movies
    const [personMovies, setPersonMovies] = useState([])
    const [personDetails, setPersonDetails] = useState([])
    // loading from loading file
    const [loading, setLoading] = useState(false)
    const navigate = useNavigation();
    const handleOnChange = () => {
        // Add your logic here
        console.log('Return to home clicked');
        navigate.goBack();
    };

    // for Heart Icon functional
    const [isFavourite, toggleFavourite] = useState(false);
    const handlePress = () => {
        toggleFavourite(!isFavourite);
    };

    const {params: item} = useRoute();
    useEffect(() => {
        setLoading(true)
        // console.log('personData',item)
        getPersonDetails(item.id)
        getMoviesPerson(item.id)
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        // console.log(data,'person Details')
        if(data) setPersonDetails(data)
        setLoading(false)
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        // console.log(data,'person Details')
        if(data && data.cast) setPersonMovies(data.cast)
        setLoading(false)
    }

    return (
        <ScrollView className={'flex-1 bg-neutral-800'}
                    contentContainerStyle={{paddingBottom: 20}}
        >
            {/*back Button*/}
            <SafeAreaView className={ios ? 'mt-10' : 'my-3'}>
                <View className={' z-20 w-full flex-row justify-between items-center px-4'}>
                    <TouchableOpacity onPress={handleOnChange} className={'rounded-xl p-1 bg-amber-500'}>
                        <ChevronLeftIcon size={'28'} strokeWidth={2.5} color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePress}>
                        <HeartIcon size={35} color={isFavourite ? 'red' : "white"}/>
                    </TouchableOpacity>
                </View>

                {/*    person details*/}

                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <View>
                            <View className={'flex-row justify-center'}
                                  style={{
                                      shadowColor: 'gray',
                                      shadowRadius: 40,
                                      shadowOffset: {width: 0, height: 5},
                                      shadowOpacity: 1,
                                  }}>
                                <View
                                    className={'items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'}>
                                    <Image
                                        // source={require('../components/homeScreen/carousalimages/WhatsApp Image 2024-04-04 at 11.32.16_002617b2.jpg')
                                            // source={require('../components/homeScreen/carousalimages/wp4252982-bollywood-movies-wallpapers.jpg')

                                        source={{uri:image342(personDetails?.profile_path) || fallBackPerson}}

                                        style={{width: width * 0.74, height: height * 0.43}}/>
                                </View>
                            </View>

                            <View className={'mt-6'}>
                                <Text className={'text-3xl text-white font-bold text-center'}>
                                    {
                                        personDetails?.name
                                    }
                                </Text>

                                <Text className={'text-lg text-neutral-500  text-center'}>
                                    {
                                        personDetails?.place_of_birth
                                    }
                                </Text>

                            </View>

                            <View
                                className={'mt-4 p-4 justify-between mx-3 flex-row items-center bg-neutral-700 rounded-full'}>
                                <View className={'border-r-2 border-neutral-400 px-2 items-center'}>
                                    <Text className={'text-white font-semibold'}>Gender</Text>
                                    <Text className={'text-neutral-300 text-sm'}>
                                        {
                                            personDetails?.gender==1?'Female':'Male'
                                        }
                                    </Text>
                                </View>
                                <View className={'border-r-2 border-neutral-400 px-2 items-center'}>
                                    <Text className={'text-white font-semibold'}>Birthday</Text>
                                    <Text className={'text-neutral-300 text-sm'}>{
                                        personDetails?.birthday
                                    }</Text>
                                </View>
                                <View className={'border-r-2 border-neutral-400 px-2 items-center'}>
                                    <Text className={'text-white font-semibold'}>Occupation</Text>
                                    <Text className={'text-neutral-300 text-sm'}>
                                        {
                                            personDetails?.know_for_department
                                        }
                                    </Text>
                                </View>
                                <View className={' px-2 items-center'}>
                                    <Text className={'text-white font-semibold'}>Popularity</Text>
                                    <Text className={'text-neutral-300 text-sm'}>{
                                        personDetails?.popularity?.toFixed(2)
                                    }</Text>
                                </View>
                            </View>

                            <View className={'my-6 mx-4 space-y-2'}>
                                <Text className={'text-white text-xl'}>
                                    Biography
                                </Text>
                                <Text className={'text-neutral-400 tracking-wider'}>
                                    {/*Tamannaah Bhatia is an Indian actress and model born on December 21, 1989, in*/}
                                    {/*Mumbai,*/}
                                    {/*Maharashtra, India. She began her acting career in 2005 and has since appeared in*/}
                                    {/*numerous*/}
                                    {/*Telugu, Tamil, and Hindi films. Tamannaah gained widespread recognition for her*/}
                                    {/*performances*/}
                                    {/*in movies such as "Baahubali: The Beginning" and "Baahubali 2: The Conclusion". She*/}
                                    {/*is known*/}
                                    {/*for her versatile acting skills and charming screen presence.*/}
                                    {
                                        personDetails?.biography || 'N/A'
                                    }
                                </Text>

                            </View>

                            {/*    Movies List of this person*/}
                            <MovieLists title={'Movies'} hideSeeAll={true} data={personMovies}/>
                        </View>
                    )
                }


            </SafeAreaView>
        </ScrollView>
    );
}

