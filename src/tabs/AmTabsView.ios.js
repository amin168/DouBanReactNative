import React from 'react';
import {
    View,
    Text,
    TabBarIOS
}from 'react-native';

import AmColors from '../component/AmColors'
import { DefaultRenderer } from 'react-native-router-flux';

class AmTabsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'movie',
        };
        this.onTabSelect = this.onTabSelect.bind(this);
    }

    onTabSelect(tab) {
        this.setState({ tab: tab });
        this.props.title = tab;
    }

    render() {
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <TabBarIOS tintColor={AmColors.darkText}>
                <TabBarIOS.Item
                    title="Movie"
                    selected={this.state.tab === 'movie'}
                    onPress={()=>this.onTabSelect('movie')}
                    icon={require('./img/movie.png')}
                    selectedIcon={require('./img/movie_active.png')}>

                    <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>

                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Book"
                    selected={this.state.tab === 'book'}
                    onPress={()=>this.onTabSelect('book')}
                    icon={require('./img/book.png')}
                    selectedIcon={require('./img/book_active.png')}>

                    <DefaultRenderer navigationState={children[1]} onNavigate={this.props.onNavigate}/>

                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Music"
                    selected={this.state.tab === 'music'}
                    onPress={()=>this.onTabSelect('music')}
                    icon={require('./img/music.png')}
                    selectedIcon={require('./img/music_active.png')}>

                    <DefaultRenderer navigationState={children[2]} onNavigate={this.props.onNavigate}/>

                </TabBarIOS.Item>

            </TabBarIOS>
        )
    }

}

export default AmTabsView