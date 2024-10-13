import { React } from 'react'
import {View, Text,  StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel'

export const WelcomeCarousel = () =>{
    const data = [
        {title: 'slider 1', text: 'Text 1'},
        {title: 'slider 2', text: 'Text 2'},
        {title: 'slider 3', text: 'Text 3'},
    ];

    const renderItem = ({item}) =>(
        <View>
            <Text>{item.title}</Text>
            <Text>{item.text}</Text>
        </View>
    );


    return(
        <View style={styl}>
            <Carousel
                layout="default"
                data={data}
                renderItem={renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
            />
        </View>

    )
}

