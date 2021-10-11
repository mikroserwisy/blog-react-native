import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import ArticleSummary from './ArticleSummary';
import getArticles from './articles-service'
import SettingsScreen from '../profile/SettingsScreen';

export default function({navigation}) {

    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isShowSettings, setShowSettings] = useState(false);

    useEffect(() => {
        setArticles(true)
        getArticles()
            .then(setArticles)
            .catch(onError)
            .finally(() => setLoading(false))
    }, [])

    const onError = (error) => {
        console.log('##' + error);
    }

    const showDetails = (article) => navigation.navigate('Article', {article})
    
    return (
        <>
            <SettingsScreen show={isShowSettings} close={() => setShowSettings(false)}/>
            <View style={styles.container}>
                <Button onPress={() => setShowSettings(true)} title="Show settings"/>
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