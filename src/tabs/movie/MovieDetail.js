import React, {
    Component,
}from 'react';

import {
    StyleSheet,
    View,
    Text,
    WebView
}from 'react-native';

var Dimensions = require('Dimensions');
var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;

class MovieDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView style={styles.webview}
                         source={{uri:this.props.data.alt,method: 'GET'}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         scalesPageToFit={true}
                         mediaPlaybackRequiresUserAction={true}
                         startInLoadingState={true}>
                </WebView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, webview: {
        width: screenW,
        height: screenH,
        backgroundColor: '#E8E8E8'
    }
});

export default MovieDetails;
