import {Stack} from "expo-router";
import {PaperProvider} from "react-native-paper";
import React from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const RootLayout = () => {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppLayout/>
            </QueryClientProvider>
        </>

    )
}

const AppLayout = () => {
    return (
        <PaperProvider>
            <Stack>
                <Stack.Screen name='index' options={{headerTitle: 'Home'}}/>
                <Stack.Screen name='[id]' options={{headerTitle: 'Detail'}}/>
                <Stack.Screen name='add-meal' options={{headerTitle: 'Add Meal'}}/>
            </Stack>
        </PaperProvider>
    )
}

export default RootLayout;