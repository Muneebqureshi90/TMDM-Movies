import React, {useCallback, useEffect, useState} from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronDoubleLeftIcon, ChevronLeftIcon, XMarkIcon} from "react-native-heroicons/outline";
import {styles, theme} from "../theme";
import {HeartIcon} from "react-native-heroicons/solid";
import {LinearGradient} from "expo-linear-gradient";
import Cast from "../components/movieScreen/Cast";
import MovieLists from "../components/homeScreen/moviesList/MovieLists";
import Loading from "../components/loading/Loading";
import {debounce} from "lodash";
import {fallBackMoviePoster, fetchSearchMovies, image185} from "../apiFromTMDB/MovieDb";
// Import debounce function

var {width, height} = Dimensions.get('window');

const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-5';
const SearchScreen = () => {
    let movieName = 'Baahubali 2'

    const navigation = useNavigation();
    const onHandlePress = () => {
        // Add your logic here
        // console.log('Return to home clicked');
        navigation.navigate('Home');
    };
    const handleOnMovie = (item) => { // Pass 'item' as a parameter
        navigation.push('Movie', item); // Use navigation.push to navigate to 'Movie' screen with 'item'
    }
    // Define the handleSearch function to handle search input
    const handleSearch = value => {
        // console.log('data search', value);
        if (value && value.length > 2) {
            setLoading(true);
            fetchSearchMovies({

                    query: value, include_adult:
                        'false', language:
                        'en-US', page:
                        '1',
                }
            ).then(data => {
                setLoading(false);
                console.log(data,'DATA IS THIS')
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false);
            setResults([])
        }
    };

// Define the handleTextDebounce function with debounced handleSearch
    const handleTextDebounce = useCallback(
        debounce((value) => handleSearch(value), 400), // Debounce handleSearch function
        [] // Empty dependency array since handleSearch does not depend on any external variables
    );

    // loading from loading file
    const [loading, setLoading] = useState(false)
    const [result, setResults] = useState([])


    return (
        // <SafeAreaView className={ios ? '-mb-2' : 'mt-2 bg-neutral-700'}>

        <SafeAreaView
            className={' bg-neutral-800 flex-1'}
        >
            <View className={'mx-4 flex-row mb-4 justify-between items-center border border-neutral-500 rounded-full'}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder={'Search Here'} // Placeholder text
                    placeholderTextColor={'lightgray'} // Placeholder text color
                    className={'pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'} // Custom styles
                />
                <TouchableOpacity onPress={onHandlePress} className={'rounded-full p-3 m-1 bg-neutral-500'}>
                    <XMarkIcon size={'25'} color={'white'}/>
                </TouchableOpacity>
            </View>

            {/*    Results*/}
            {
                loading ? (
                        <Loading/>
                    ) :
                    /*if we have no reult */

                    result.length > 0 ? (

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingHorizontal: 15}}
                                className={'space-y-3'}
                            >
                                <Text className={'text-white font-semibold ml-5'}>
                                    Results ({result.length})
                                </Text>

                                <View className={'flex-row justify-between flex-wrap'}>
                                    {
                                        result.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={handleOnMovie}>
                                                    <View className={'space-y-2 mb-4'}>
                                                        <Image
                                                            // source={require('../components/homeScreen/carousalimages/wc1763268-bollywood-wallpaper-2017.jpg')
                                                            // source={require('../components/homeScreen/carousalimages/wp4252982-bollywood-movies-wallpapers.jpg')
                                                           source={{uri:image185(item?.poster_path) || fallBackMoviePoster}
                                                            }
                                                            style={{width: width * 0.44, height: height * 0.3}}/>
                                                        <Text className={'text-neutral-400 ml-1'}>
                                                            {
                                                                item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                                                            }
                                                        </Text>
                                                    </View>

                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        ) :
                        (
                            <View className={'flex items-center justify-center h-full'}>
                                <Text className={'text-white font-semibold'}>
                                    No results found.
                                </Text>
                            </View>
                        )

            }


        </SafeAreaView>

    );
};

export default SearchScreen;
