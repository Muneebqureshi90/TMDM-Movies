import React from 'react';

import {Dimensions, Text, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import {useNavigation} from "@react-navigation/native";

var {width, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {

    // corousal card iitem data on click
    const naviagte = useNavigation();

    const handleClick = (item) => {
        // Add your logic here
        console.log('Movie card clicked');
        naviagte.navigate('Movie', item);
    }

    return (
        <View className={'mb-8'}>
            <Text className={'text-white text-xl mx-4 mb-5'}>Trending</Text>
            <Carousel
                data={data} // 1. The data prop is an array of items to render in the carousel.
                renderItem={({item}) => <MovieCard item={item}
                                                   handleClick={handleClick}/>} // 2. The renderItem prop is a function that renders each item in the carousel. It receives an object with the item to render.
                firstItem={1} // 3. The firstItem prop determines which item should be the first one displayed in the carousel. It is 1-based index.
                inactiveSlideOpacity={0.06} // 4. The inactiveSlideOpacity prop determines the opacity of inactive slides in the carousel. This value should be between 0 and 1.
                sliderWidth={width} // 5. The sliderWidth prop specifies the width of the carousel container. Adjust this value according to your layout requirements.
                itemWidth={width * 0.62} // 6. The itemWidth prop specifies the width of each item in the carousel. Adjust this value according to your layout requirements.
                slideStyle={{
                    display: 'flex',
                    alignItems: 'center'
                }} // 7. The slideStyle prop is an object containing styles to apply to each slide in the carousel. In this case, it sets the display to flex and aligns items to the center.
                // autoplay={true} // Enable autoplay
                // autoplayInterval={1000}
            />
        </View>
    );
};

export default TrendingMovies;
