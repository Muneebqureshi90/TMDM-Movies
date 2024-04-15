import React, {useEffect, useState} from 'react';
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
import * as Progress from 'react-native-progress';
import {theme} from "../../theme";


var {width, height} = Dimensions.get('window');

const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-5';
const Loading = () => {

    const navigation = useNavigation();
    const onHandlePress = () => {
        // Add your logic here
        // console.log('Return to home clicked');
        navigation.navigate('Home');
    };


    return (

        // using this in other files

        <View style={{height, width}} className={' absolute flex-row justify-center items-center'}
        >
            <Progress.CircleSnail thickness={12} size={180} color={theme.background} />
        </View>

    );
};

export default Loading;
