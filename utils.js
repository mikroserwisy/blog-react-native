import { StyleSheet, Platform, StatusBar } from "react-native";
import { fileServer } from "./config";

const androdNavStyle = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0
    }
})

const upload = (image) => {
    const formData = new FormData();
    formData.append('photo', { type: 'image/jpeg', name: 'photo.jpg', uri: Platform.OS === 'android' ? image : image.replace('file://', '') });
    return fetch(fileServer, {
        method: 'POST',
        body: formData
    });
};

export {androdNavStyle, upload};