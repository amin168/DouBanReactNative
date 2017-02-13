/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    StatusBar,
    Platform,
    View,
    BackAndroid,
    DeviceEventEmitter,
    Navigator
} from 'react-native';

import { Router, Scene, Reducer, Actions, ActionConst } from 'react-native-router-flux';
import AmTabsView from './src/tabs/AmTabsView'

import Movie from './src/tabs/movie'
import Music from './src/tabs/music'
import Book from './src/tabs/book'
import MovieMessage from './src/tabs/movie/MovieMessage'
import MovieDetail from './src/tabs/movie/MovieDetail'

let isMainScreen = false;
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        if (action.type === ActionConst.FOCUS && action.scene && action.scene.initial) {
            isMainScreen = true;
        } else {
            isMainScreen = false;
        }
        if (action.type === ActionConst.BACK_ACTION || action.type === ActionConst.BACK) {
            DeviceEventEmitter.emit('navigatorBack');
        }
        return defaultReducer(state, action);
    };
};


export default class AminReactNative extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (!isMainScreen) {
                Actions.pop();
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {

        const WrapperMovie = (props) => (
            <View style={styles.container}>
                <Movie {...props} />
            </View>
        )

        const WrapperBook = (props) => (
            <View style={styles.container}>
                <Book {...props}/>
            </View>
        )

        const WrapperMusic = (props) => (
            <View style={styles.container}>
                <Music {...props}/>
            </View>
        )

        const WrapperMovieMessage = (props) => (
            <View style={styles.container}>
                <MovieMessage {...props}/>
            </View>
        )

        const WrapperMovieDetail = (props) => (
            <View style={styles.container}>
                <MovieDetail {...props}/>
            </View>
        )

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#0398ff'
                    barStyle="light-content"
                />
                <Router createReducer={reducerCreate} backButtonImage={require("./src/component/img/back.png")} backButtonTextStyle={styles.tabBarStyle} navigationBarStyle={styles.navigationBarStyle}
                        titleStyle={styles.titleStyle}>
                    <Scene key="root">
                        <Scene key="app" component={AmTabsView} tabs={true}>
                            <Scene key="Movie" component={WrapperMovie} title="电影"/>
                            <Scene key="Book" component={WrapperBook} title="文学"/>
                            <Scene key="Music" component={WrapperMusic} title="音乐"/>

                        </Scene>

                        <Scene key="MovieMessage" component={WrapperMovieMessage}/>
                        <Scene key="MovieDetail" component={WrapperMovieDetail}/>
                    </Scene>
                </Router>
            </View>
        );
    }
}


AppRegistry.registerComponent('DouBanReactNative', () => AminReactNative);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                marginTop: 64,
            },
            android: {
                marginTop: 54,
            }
        })
    },
    tabBarStyle: {
        backgroundColor: 'white',
    },
    navigationBarStyle: {
        backgroundColor: '#0398ff',
    },
    titleStyle: {
        color: 'white',
    }
});
