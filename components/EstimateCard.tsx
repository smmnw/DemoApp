import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EstimateCard = ({ estimate }: any) => {
    const theme = useTheme();

    // Default fallback values
    const fallback = {
        calories_kcal: 0,
        protein_g: 0,
        carbo_g: 0,
        fat_g: 0,
    };

    // Use fallback if estimate is undefined or missing keys
    const safeEstimate = {
        ...fallback,
        ...estimate,
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>Estimated Totals</Title>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="fire" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Calories: {safeEstimate.calories_kcal} kcal</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="fish" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Protein: {safeEstimate.protein_g} g</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="food-apple-outline" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Carbs: {safeEstimate.carbo_g} g</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="oil" size={20} color={theme.colors.primary} />
                    <Text style={styles.infoText}>Fat: {safeEstimate.fat_g} g</Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 12,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: '#90ada5',
    },
    title: {
        marginBottom: 8,
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
    },
});

export default EstimateCard;
