import React from 'react';

import {
    StyleSheet,
    View,
    Text
}from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import MovieHot from './MovieHot';
import MovieTop250 from './MovieTop250.js';
import MovieComing from './MovieComing.js';

class Movie extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar/>}
                tabBarUnderlineStyle={{backgroundColor: '#1683FB'}}
                tabBarActiveTextColor='#1683FB'>
                <MovieHot tabLabel='热映榜'></MovieHot>
                <MovieComing tabLabel='正在上映'></MovieComing>
                <MovieTop250 tabLabel='TOP250'></MovieTop250>
            </ScrollableTabView>
        )
    }

}
export default Movie;