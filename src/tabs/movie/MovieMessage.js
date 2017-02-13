import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ListView
}from 'react-native';

import { Actions } from 'react-native-router-flux';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator'

const MOVIE_MESSAGE_API = 'https://api.douban.com/v2/movie/subject/';

class MovieMessage extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource:ds.cloneWithRows(this.props.data.casts),
            content: '',
            countries: null,
            animating: true
        };
    }


    render() {
        let type = '';
        for (let i = 0; i < this.props.data.genres.length; i++) {
            if (i == 0) {
                type = this.props.data.genres[0];
            } else {
                type += "/" + this.props.data.genres[i];
            }
        }

        if (this.state.animating) {
            return (
                <ActivityIndicator toast/>
            )
        }

        return (

            <ScrollView style={styles.container}>

                <View style={styles.container}>

                    <View style={styles.messageview}>
                        <Image style={styles.infoImage} source={{uri:this.props.data.images.medium}}/>
                        <View style={styles.infoMessage}>
                            <Text style={styles.infotxt}>{this.props.data.title}</Text>
                            <Text style={styles.infotxt}>{this.props.data.original_title + '[原名]'}</Text>
                            <Text style={styles.infotxt}>{'评分:' + this.props.data.rating.average}</Text>
                            <Text style={styles.infotxt}>{this.props.data.year + '年 出品'}</Text>
                            <Text style={styles.infotxt}>{type}</Text>
                            <Text style={styles.infotxt}>{"国家:" + this.state.countries}</Text>
                        </View>
                    </View>

                    <Text style={styles.infomessagebg}>{'简介'}</Text>

                    <Text style={styles.infomsgcontent}>{this.state.content}</Text>

                    <View style={styles.infopeopleview}>
                        <Image style={styles.infopeopleimg}
                               source={{uri:this.props.data.directors[0].avatars.medium}}></Image>
                        <View style={styles.infopeoplemsg}>
                            <Text style={{marginTop:15}}>{this.props.data.directors[0].name}</Text>
                            <Text style={{marginTop:3}}>{'[导演]'}</Text>
                        </View>
                    </View>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderListViewItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}></ListView>

                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.onMoreButton(this.props.data)}}>
                        <View style={styles.more}>
                            <Text style={{padding:5}}>{'更多'}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }

    onMoreButton(movie){
        Actions.MovieDetail({
            data: movie,
            title: movie.title
        })
    }

    renderListViewItem(casts){
        return(
            <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.infopeopleview}>
                    <Image style={styles.infopeopleimg} source={{uri:casts.avatars.medium}}></Image>
                    <View style={styles.infopeoplemsg}>
                        <Text style={{marginTop:15}}>{casts.name}</Text>
                        <Text style={{marginTop:3}}>{'[演员]'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    componentDidMount() {
        this.getMovieData();
    }

    getMovieData() {

        this.setState({
            animating: true
        });

        fetch(MOVIE_MESSAGE_API + this.props.data.id)
            .then((response) => response.json())
            .then((responseData) => {
                    this.setState({
                        content: responseData.summary,
                        countries: responseData.countries[0],
                        animating: false
                    });
                }
            );
    }

}

export default MovieMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }, messageview: {
        flexDirection: 'row'
    }, infoImage: {
        width: 150,
        height: 200,
        marginTop: 10,
        marginLeft: 10
    }, infoMessage: {
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10
    }, infotxt: {
        marginTop: 5,
        fontSize: 15
    }, infomessagebg: {
        padding: 2,
        backgroundColor: '#F2F2F2',
        width: 50,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 15,
        textAlign: 'center',
        borderRadius: 5
    }, infomsgcontent: {
        backgroundColor: '#F2F2F2',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        padding: 3,
        borderRadius: 5
    }, infopeopleimg: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15
    }, infopeoplemsg: {
        flexDirection: 'column',
        marginLeft: 5
    }, infopeopleview: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    }, more: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#F2F2F2',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});