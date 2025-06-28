import {Alert, FlatList, Platform, View} from "react-native";
import {Button, FAB} from "react-native-paper" // ⬅️ Import FAB here
import MealCard from "@/components/MealCard";
import {foodData} from "@/data/fakedata";
import EstimateCard from "@/components/EstimateCard";
import {calculateEstimate} from "@/utils";
import {Meal} from "@/types";
import {router} from "expo-router";
import {useReadAllMeals} from '@/hooks/useFood'
import {use, useEffect, useState} from "react";
import ImagePicker from "expo-image-picker";
import {requestAllPermissions} from "@/utils/requestPermission";
import Loading from "@/components/Loading";

const Root = () => {
    // Note: foodData seems to be fakedata, but useReadAllMeals is also fetching.
    // Ensure you're using the correct data source for your actual application.
    const summaryEstimate = calculateEstimate(foodData); // Consider if this should use `meals` state instead
    // const mealData = foodData as Meal[] // This line is not used
    const {data: rawMeals, isLoading} = useReadAllMeals()
    const [meals, setMeals] = useState<Meal[]>([])

    useEffect(() => {
        async function Per() {
            await requestAllPermissions()
        }
        Per()
    }, []);

    useEffect(() => {
        if (rawMeals) {
            setMeals(rawMeals)
        }
    }, [rawMeals]);

    if (isLoading){
        return  <Loading/>
    }

    const goToDetail = (id: string) => {
        router.push(`/${id}`)
    }

    return (
        <View style={{flex: 1}}>

            <EstimateCard
                estimate={summaryEstimate}
            />

            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={({item}: { item: Meal }) => {
                    return <MealCard item={item} onClick={goToDetail} />
                }}
            />

            {/* ⬅️ Replaced the Button with FAB */}
            <FAB
                icon="plus" // A common icon for "add"
                onPress={() => {
                    router.push('/add-meal');
                }}
                style={styles.fab} // ⬅️ Apply the FAB specific style
            />
        </View>
    )
}

const styles = {
    fab: {
        position: 'absolute', // Position it absolutely
        margin: 16,            // Margin from the edges
        right: 0,              // Align to the right
        bottom: 0,             // Align to the bottom
        // You can also adjust backgroundColor, color, etc. here if needed
    },
};

export default Root;