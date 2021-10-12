import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default PhotoPicker = ({image, setImage}) => {
 
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryPermision = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryPermision.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const takePicture = async() => {
    let result = await ImagePicker.launchCameraAsync({
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage}/>
      <Button title="Take picture" onPress={takePicture} />
      {image !== '' && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}