import * as ImagePicker from "expo-image-picker";
import {Alert} from "react-native";

export const requestAllPermissions = async () => {
    const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const camera = await ImagePicker.requestCameraPermissionsAsync();

    if (gallery.status !== 'granted' || camera.status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera and gallery access is needed.');
        return false;
    }
    return true;
};