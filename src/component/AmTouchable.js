import React from 'react';
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

function AmTouchableIOS(props) {
    return (
        <TouchableHighlight
            accessibilityTraits="button"
            underlayColor="#3C5EAE"
            {...props}
        />
    );
}

var AmTouchable = Platform.OS === 'android'
    ? TouchableNativeFeedback
    : AmTouchableIOS;

module.exports = AmTouchable;