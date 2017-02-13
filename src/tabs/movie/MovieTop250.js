import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
}from 'react-native';

import { Actions } from 'react-native-router-flux';
import RefreshableListView from '../../component/RefreshableListView'

let MOVIETOP250_API = 'https://api.douban.com/v2/movie/top250';
let ranking = 0;

class MovieTop250 extends React.Component {
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

    renderRow(movie) {
        ranking++;
        return (
            <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} onPress={()=>{this.onMovieClick(movie)}}>
                <View style={styles.listitembg}>
                    <View style={styles.rankbg}>
                        <Text style={styles.rankitemtext}>{ranking + ""}</Text>
                    </View>
                    <View style={styles.listitem}>
                        <Image style={styles.itemimage} source={{uri:movie.images.medium}}/>
                        <View style={styles.itemview}>
                            <Text style={styles.itemtitle}>{movie.title}</Text>
                            <Text style={styles.itemtext}>{'评分:' + movie.rating.average}</Text>
                            <Text style={styles.itemtext}>{'类型:' + movie.genres}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderContent() {
        return (
            <RefreshableListView
                pagination={false}
                renderRow={(row)=>this.renderRow(row)}
                onRefresh={(page, callback)=>this.onRefresh(page, callback)}
                backgroundColor={'#F6F6EF'}/>
        )
    }

    onRefresh(page = 1, callback) {
        fetch(MOVIETOP250_API)
            .then((response) => response.json())
            .then((response) => {
                callback(response.subjects);
                this.setState({
                    dataRows: response.subjects
                })
            });
    }

    selectedRow(movie) {
        Actions.MovieMessage({
            data: movie,
            title: movie.title + " - 电影详情"
        })
    }

}
export default MovieTop250;


const styles = StyleSheet.create({
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    }, container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }, listStyle: {
        flex: 1
    }, listitem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    }, itemimage: {
        width: 110,
        height: 155,
        marginLeft: 3,
        marginTop: 3
    }, itemview: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        marginLeft: 10
    }, itemtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
    }, itemtext: {
        fontSize: 17,
        marginTop: 10
    }, rankbg: {
        backgroundColor: '#f1f1f1',
        justifyContent: 'center'
    }, listitembg: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 3
    }, rankitemtext: {
        fontSize: 17,
        marginTop: 10,
        marginLeft: 15
    }

});