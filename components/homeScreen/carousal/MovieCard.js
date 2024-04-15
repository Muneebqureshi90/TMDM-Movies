import React from 'react';
import {Dimensions, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {image500} from "../../../apiFromTMDB/MovieDb";

var {width, height} = Dimensions.get('window');
const MovieCard = ({item,handleClick}) => {
    console.log('item.poster_path:',item.poster_path)
    return (
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <View>

                <Image
                    // source={require('../carousalimages/wc1763268-bollywood-wallpaper-2017.jpg')}
                  source={{uri:image500(item.poster_path)}}
                    style={{
                        width: width * 0.6,
                        height: height * 0.4
                    }}
                    className={'rounded-3xl'}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MovieCard;
