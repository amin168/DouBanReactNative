import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
}from 'react-native';

import AmColors from './AmColors'
import AmTouchable from './AmTouchable'


class AmMenuItem extends React.Component {
    props: {
        icon: number;
        selectedIcon: number;
        selected: boolean;
        title: string;
        badge: ?string;
        onPress: () => void;
    };

    render() {
        var icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
        var selectedTitleStyle = this.props.selected && styles.selectedTitle;
        var badge;
        if (this.props.badge) {
            badge = (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {this.props.badge}
                    </Text>
                </View>
            );
        }
        return (
            <AmTouchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Image style={styles.icon} source={icon} />
                    <Text style={[styles.title, selectedTitleStyle]}>
                        {this.props.title}
                    </Text>
                    {badge}
                </View>
            </AmTouchable>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        flex: 1,
        fontSize: 17,
        color: AmColors.lightText,
    },
    selectedTitle: {
        color: AmColors.darkText,
    },
    badge: {
        backgroundColor: '#DC3883',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
    },
});

module.exports = AmMenuItem;
