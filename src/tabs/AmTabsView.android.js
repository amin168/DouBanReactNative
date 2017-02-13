import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
}from 'react-native';

import AmDrawerLayout from '../component/AmDrawerLayout'

import AmMenuItem from '../component/AmMenuItem'

import { Actions, DefaultRenderer } from 'react-native-router-flux';


class AmTabsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'movie',
            index: 0
        };

        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);

    }

    openDrawer() {
        this.refs.drawer.openDrawer();
    }

    onTabSelect(tab, index) {
        this.setState({ tab: tab, index: index })
        this.refs.drawer.closeDrawer();
    }


    renderNavigationView() {
        return (
            <View style={styles.drawer}>
                <Image
                    style={styles.header}
                    source={require('./img/drawer-header.png')}>
                </Image>
                <AmMenuItem
                    title="Movie"
                    selected={this.state.tab === 'movie'}
                    onPress={()=>this.onTabSelect('movie',0)}
                    icon={require('./img/movie.png')}
                    selectedIcon={require('./img/movie_active.png')}
                />

                <AmMenuItem
                    title="Book"
                    selected={this.state.tab === 'book'}
                    onPress={()=>this.onTabSelect('book',1)}
                    icon={require('./img/book.png')}
                    selectedIcon={require('./img/book_active.png')}
                />
                <AmMenuItem
                    title="Music"
                    selected={this.state.tab === 'music'}
                    onPress={()=>this.onTabSelect('music',2)}
                    icon={require('./img/music.png')}
                    selectedIcon={require('./img/music_active.png')}
                />
            </View>
        );
    }


    render() {

        const state = this.props.navigationState;
        const children = state.children;

        return (
            <AmDrawerLayout
                {...this.props}
                ref="drawer"
                drawerWidth={250}
                drawerPosition="left"
                renderNavigationView={this.renderNavigationView}>
                <View style={styles.content} key={this.state.tab}>
                    <DefaultRenderer navigationState={children[this.state.index]} onNavigate={this.props.onNavigate}/>
                </View>
            </AmDrawerLayout>
        );
    }
}

export default AmTabsView;


var styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    }
});
