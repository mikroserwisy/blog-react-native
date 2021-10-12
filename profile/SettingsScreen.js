import { View, StyleSheet, ImageBackground, Dimensions, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux';

const screenHeight = Dimensions.get('window').height;

const SettingsScreen = (props) => {

    const [top, setTop] = useState(new Animated.Value(screenHeight));

    useEffect(() => {
        if (props.show) {
            Animated.spring(top, {toValue: 0, useNativeDriver: false}).start();
        } else {
            Animated.spring(top, {toValue: screenHeight + StatusBar.currentHeight,useNativeDriver: false}).start();
        }
    });

    const AnimatedComponent = Animated.createAnimatedComponent(View);

    return (
        <AnimatedComponent style={[styles.container, {top}]}>
            <TouchableOpacity onPress={props.close} style={styles.closeButton}>
                <Ionicons name="close-outline" size={40} color="#546bfb"/>
            </TouchableOpacity>
        </AnimatedComponent>
    );

}

const mapStateToProps = (state) => ({show: state.showSettings});

const mapDispatchToProps = (dispatch) => ({ close: () => dispatch({type: actions.hideSettings})});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 100
    },
    closeButton: {
        top: 40,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center'
    }
});