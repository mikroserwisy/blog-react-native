import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import React from 'react';

export default function({route}) {
    const article = route.params.article;
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.cover} resizeMode="cover" source={{ uri: article.cover }}/>
            <View style={styles.info}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.timestamp}>{article.timestamp}</Text>
                <Text style={styles.content}>{article.content}</Text>
                <Text>Details</Text>
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width; 

const styles = StyleSheet.create({
    container: {
    },
    cover: {
        height: 300,
    },
    info: {
        padding: 20
    },
    title: {
        marginTop: 10,
        fontSize: 30
    },
    timestamp: {
        marginTop: 4,
        marginBottom: 4
    },
    content: {
        fontSize: 16,
        textAlign: 'justify'
    }
});