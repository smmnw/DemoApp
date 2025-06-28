import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Meal} from "@/types";

const NutritionCard = ({ item ,onClick}:{item:Meal,onClick:any}) => {

    const theme = useTheme();
    console.log(item)
    return (
        <Card style={styles.card} onPress={()=>{
            onClick(item.id)
        }}>

            <Card.Cover
                //@ts-ignore
                source={item.img} />
            <Card.Content>
                <Title style={styles.title}>{item.name}</Title>
                <Paragraph>Weight: {item.weight_g}g</Paragraph>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="fire" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Calories: {item.calories_kcal} kcal</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="food-apple" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Carbs: {item.carbo_g} g</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="fish" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Protein: {item.protein_g} g</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="oil" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Fat: {item.fat_g} g</Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 12,
        elevation: 3,

    },
    title: {
        marginBottom: 4,
        fontWeight: 'bold',
        fontSize: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
    },
});

export default NutritionCard;
