import { View, StyleSheet, Dimensions, Animated, StatusBar, TouchableOpacity, Button, Platform, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux';
import PhotoPicker from '../components/PhotoPicker';
import { upload } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('window').height;

const SettingsScreen = (props) => {

    const [top, setTop] = useState(new Animated.Value(screenHeight));
    const [image, setImage] = useState("");

    useEffect(() => {
        if (props.show) {
            Animated.spring(top, {toValue: 0, useNativeDriver: false}).start();
        } else {
            Animated.spring(top, {toValue: screenHeight + StatusBar.currentHeight,useNativeDriver: false}).start();
        }
    });

    const AnimatedComponent = Animated.createAnimatedComponent(View);

    const uploadPhoto = () => {
        upload(image)
            //.then(error => Alert.alert('Failed'))
            //.then(response => console.log(response))
            //.catch(error => Alert.alert(error));
    };

    const storageTest = async() => {
        try {
            const key = 'phptoUrl';
            await AsyncStorage.setItem(key, image);
            const value = await AsyncStorage.getItem(key);
            console.log(value);
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <AnimatedComponent style={[styles.container, {top}]}>
            <TouchableOpacity onPress={props.close} style={styles.closeButton}>
                <Ionicons name="close-outline" size={40} color="#546bfb"/>
            </TouchableOpacity>
            <PhotoPicker image={image} setImage={setImage}/>
            <Button title="Save" onPress={uploadPhoto}/>
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center'
    }
});