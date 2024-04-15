import React from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {styles} from "../../../theme";
import TrendingMovies from "../carousal/TrendingMovies";
import {useNavigation} from "@react-navigation/native";

import {fallBackMoviePoster, image185} from "../../../apiFromTMDB/MovieDb"; // Import useNavigation

var {width, height} = Dimensions.get('window');
const MovieLists = ({title, data, hideSeeAll}) => {

    let movieName = 'Jai ho'

    const navigation = useNavigation(); // Corrected useNavigation
    const handleOnClick = (item) => { // Pass 'item' as a parameter
        navigation.push('Movie', item); // Use navigation.push to navigate to 'Movie' screen with 'item'
    }


    return (
        <View className={'mb-8 space-y-4'}>

            <View className={'justify-between flex flex-row mx-4 items-center'}>
                <Text className={'text-white text-xl'}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className={'text-lg'}>See All</Text>
                        </TouchableOpacity>
                    )
                }

            </View>

            {/*list of movies*/}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{paddingHorizontal: 15}}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={handleOnClick}
                            >

                                <View>
                                    <Image
                                        // source={require('../carousalimages/wp4252970-bollywood-movies-wallpapers.jpg')}
                                       source={{uri:image185(item.poster_path) || fallBackMoviePoster}}
                                        style={{
                                            width: width * 0.33,
                                            height: height * 0.22
                                        }}
                                        className={'rounded-3xl mr-5 '}
                                    />
                                    <Text className={'text-neutral-300 ml-1'}>
                                        {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                                    </Text>
                                </View>


                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>


        </View>
    );
};

export default MovieLists;
