import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { actions, reducer } from '../redux';
import SettingsScreen from './SettingsScreen';

const ProfileScreen = (props) => {

    return (
        <View style={styles.container}>
            <SettingsScreen/>
            <TouchableOpacity onPress={props.showSettings}>
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    );

}

const mapStateToProps = (state) => ({shouldShowSettings: state.showSettings});

const mapDispatchToProps = (dispatch) => ({ showSettings: () => dispatch({type: actions.showSettings})});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});