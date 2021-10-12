import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import ArticleSummary from './ArticleSummary';
import {getArticles, getCachedArticles } from './Articles'
import SettingsScreen from '../profile/SettingsScreen';

export default ({navigation}) => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCachedArticles(setArticles);
        setLoading(false);
    }, [])

    const onError = (error) => {
        console.log('##' + error);
    }

    const showDetails = (article) => navigation.push('Article', {article})

    const refresh = () => {
        setLoading(true);
        getArticles()
            .then(setArticles)
            .catch(onError)
            .finally(() => setLoading(false))
    };
    
    return (
        <>
            <Button title="Refresh" onPress={refresh}/>
            <View style={styles.container}>
                { isLoading ? 
                    <ActivityIndicator size="large" color="#0000ff"/> :
                    <FlatList 
                        data={articles} keyExtractor={({uri}) => uri} 
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => showDetails(item)}>
                                <ArticleSummary article={item}/>
                            </TouchableOpacity>
                        )}/>
                }       
        </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});