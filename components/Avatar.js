import { StyleSheet, Image} from 'react-native';
import React from 'react';

export default (props) => (
    <Image style={styles.container} source={require("../assets/profile.png")}/>
);

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: 'black',
        borderRadius: 30
    }
});