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

const MOVIECOMING_API = 'https://api.douban.com/v2/movie/coming_soon';

class MovieComing extends React.Component {
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
        let directors = '无';
        if (movie.directors[0] != null) {
            directors = movie.directors[0].name;
        }
        let casts = '';
        let i = 0;
        for (let cast in movie.casts) {
            if (i === 0) {
                casts = movie.casts[0].name;
            } else {
                casts += "," + movie.casts[i].name;
            }
            i++;
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} onPress={()=>{this.selectedRow(movie)}}>
                <View style={styles.listitem}>
                    <Image style={styles.itemimage} source={{uri:movie.images.medium}}/>
                    <View style={styles.itemview}>
                        <Text style={styles.itemtitle}>{movie.title}</Text>
                        <Text style={styles.itemtext}>{'评分:' + movie.rating.average}</Text>
                        <Text style={styles.itemtext}>{'类型:' + movie.genres}</Text>
                        <Text style={styles.itemtext}>{'导演:' + directors}</Text>
                        <Text style={styles.itemtext}>{'演员:' + casts}</Text>
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
        fetch(MOVIECOMING_API)
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
export default MovieComing;


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
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 3
    }, itemimage: {
        width: 110,
        height: 150
    }, itemview: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10
    }, itemtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
    }, itemtext: {
        fontSize: 17,
        marginTop: 5
    }

});