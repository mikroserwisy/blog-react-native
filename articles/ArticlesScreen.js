import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import ArticleSummary from './ArticleSummary';
import {refreshArticles, getCachedArticles } from './Articles'
import SettingsScreen from '../profile/SettingsScreen';
import { connect } from 'react-redux';

const ArticlesScreen = (props) => {

    const showDetails = (article) => props.navigation.push('Article', {article})

    useEffect(() => {
        getCachedArticles();
    }, []);

    return (
        <>
            <Button title="Refresh" onPress={refreshArticles}/>
            <View style={styles.container}>
                { props.inProgress ? 
                    <ActivityIndicator size="large" color="#0000ff"/> :
                    <FlatList 
                        data={props.articles} keyExtractor={({uri}) => uri} articles
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

const mapStateToProps = (state) => ({inProgress: state.inProgress, articles: state.articles});

const mapDispatchToProps = (dispatch) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});