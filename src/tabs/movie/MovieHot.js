import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
}from 'react-native';

import { Actions } from 'react-native-router-flux';

const screenW = Dimensions.get('window').width;

import RefreshableListView from '../../component/RefreshableListView'

const MOVIEHOT_API = 'https://api.douban.com/v2/movie/in_theaters';

class MovieHot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataRows: null
        }

        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
        this.renderContent = this.renderContent.bind(this);


    }

    render() {
        return this.renderContent()
    }

    selectedRow(movie) {
        Actions.MovieMessage({
            data: movie,
            title: movie.title + " - 电影详情"
        })
    }

    onRefresh(page = 1, callback) {
        fetch(MOVIEHOT_API)
            .then((response) => response.json())
            .then((response) => {
                callback(response.subjects);
                this.setState({
                    dataRows: response.subjects
                })
            });
    }

    renderRow(movie) {
        return (
            <TouchableOpacity style={styles.itemViewStyle} activeOpacity={0.8} onPress={()=>{this.selectedRow(movie)}}>
                <Image source={{uri:movie.images.medium}} style={styles.itemIconStyle}/>
                <Text numberOfLines={1} style={styles.itemTitleStyle}>{movie.title}</Text>
                <Text numberOfLines={1} style={styles.itemTitleStyle}>{'评分:' + movie.rating.average}</Text>
            </TouchableOpacity>
        );
    }

    renderContent() {

        return (
            <RefreshableListView
                contentContainerStyle={styles.listStyle}
                pagination={false}
                renderRow={(row)=>this.renderRow(row)}
                onRefresh={(page, callback)=>this.onRefresh(page, callback)}
                backgroundColor={'#F6F6EF'}/>
        )
    }

}

export default MovieHot;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    listStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemViewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenW / 3,
        height: 190,
        marginTop: 3,
        marginBottom: 3
    },
    itemIconStyle: {
        width: 110,
        height: 140
    },
    itemTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: 80
    }
});