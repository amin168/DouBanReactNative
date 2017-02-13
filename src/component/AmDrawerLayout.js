import React from 'react';
import { DrawerLayoutAndroid }from 'react-native';

class AmDrawerLayout extends React.Component {
    _drawer: ?DrawerLayoutAndroid;

    constructor(props: any, context: any) {
        super(props, context);
        (this: any).openDrawer = this.openDrawer.bind(this);
        (this: any).closeDrawer = this.closeDrawer.bind(this);
        (this: any).onDrawerOpen = this.onDrawerOpen.bind(this);
        (this: any).onDrawerClose = this.onDrawerClose.bind(this);
        (this: any).handleBackButton = this.handleBackButton.bind(this);
    }

    render() {
        const { drawerPosition, ...props } = this.props;
        const { Right, Left } = DrawerLayoutAndroid.positions;

        return (
            <DrawerLayoutAndroid
                ref={(drawer) => { this._drawer = drawer; }}
                {...props}
                drawerPosition={drawerPosition === 'right' ? Right : Left}
                onDrawerOpen={this.onDrawerOpen}
                onDrawerClose={this.onDrawerClose}
            />
        );
    }

    componentWillUnmount() {
        this._drawer = null;
    }

    handleBackButton(): boolean {
        this.closeDrawer();
        return true;
    }

    onDrawerOpen() {
        this.props.onDrawerOpen && this.props.onDrawerOpen();
    }

    onDrawerClose() {
        this.props.onDrawerClose && this.props.onDrawerClose();
    }

    closeDrawer() {
        this._drawer && this._drawer.closeDrawer();
    }

    openDrawer() {
        this._drawer && this._drawer.openDrawer();
    }

}

module.exports = AmDrawerLayout;
