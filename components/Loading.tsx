import {View,StyleSheet} from "react-native";

import { ActivityIndicator, MD2Colors,Text } from 'react-native-paper';


const LoadingComponent = ({ message = "Loading..." }) => {
    return (
        // The container fills the screen to center the loading indicator
        // and prevent interaction with the underlying content while loading.
        <View style={styles.container}>
            {/* Using React Native Paper's ActivityIndicator */}
            {/* size can be 'small' or 'large' */}
            {/* color can be any valid color string, here using MD2Colors.blue500 from Paper */}
            <ActivityIndicator size="large" color={MD2Colors.blue500} />
            {/* Optional text to provide context to the user */}
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
};



const styles=StyleSheet.create({
    container: {
        flex: 1, // Ensures the loading component takes up the full full screen
        justifyContent: 'center', // Centers vertically
        alignItems: 'center',     // Centers horizontally
        backgroundColor: '#f0f0f0', // Light background for contrast
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    }
})

export default LoadingComponent;