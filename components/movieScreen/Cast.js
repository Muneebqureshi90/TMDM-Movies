import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import {useNavigation} from "@react-navigation/native";
import {fallBackPerson, image185} from "../../apiFromTMDB/MovieDb";

var {width, height} = Dimensions.get('window');
const Cast = ({cast}) => {


    const navigate = useNavigation();
    const [results, setResults] = useState([])

    const handleOnClick = (person) => {
        // Add your logic here
        navigate.navigate("Person", person)
    };

    let personName = 'Tamannaah Bhatia';
    let characterName = 'Avantika';
    return (
        <View className={'my-6'}>
            <Text className={'text-lg text-white mx-4 mb-5 font-semibold'}>
                Top Cast
            </Text>
            <Text className={'text-white font-semibold ml-5'}>
                Results
                ({
                results.length
            })
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{paddingHorizontal: 15}}
                className={'space-y-5'}
            >

                {/*<View className={'flex-row justify-between flex-wrap'}>*/}
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={handleOnClick}>
                                <View className={'mt-3  items-center'}>
                                    <Image className={'rounded-3xl mr-3'}
                                           // source={require('../homeScreen/carousalimages/WhatsApp Image 2024-04-04 at 11.32.16_002617b2.jpg')
                                           //     // source={require('../components/homeScreen/carousalimages/wp4252982-bollywood-movies-wallpapers.jpg')
                                           // }
                                        source={{uri:image185(person?.profile_path) || fallBackPerson}}
                                           style={{width: width * 0.44, height: height * 0.28}}/>
                                    <Text className={'text-white text-xs mt-1'}
                                          style={{justifyContent: 'center'}}>
                                        {person?.original_name.length > 10 ?person?.original_name.slice(0, 10) + '...' : person?.original_name}
                                    </Text>
                                    <Text className={' text-neutral-400 text-xs mt-1'}
                                          style={{justifyContent: 'center'}}>
                                        {person?.character.length > 10 ?person?.character.slice(0, 10) + '...' : person?.character}
                                    </Text>

                                    <Text className={'text-neutral-600'}>
                                        {person?.known_for_department}</Text>
                                </View>

                            </TouchableWithoutFeedback>
                        )
                    })
                }
                {/*</View>*/}
            </ScrollView>
        </View>
    );
};

export default Cast;
