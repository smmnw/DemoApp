import React, {useEffect, useState} from 'react';
import {Alert, Animated, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput, useTheme} from 'react-native-paper';
import {useAddMeal} from '@/hooks/useFood'
import * as ImagePicker from 'expo-image-picker'
import {router} from "expo-router";

// Utility: Check if input is  valid number
const isNumber = (value: any) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

const MealInputForm = () => {
    const theme = useTheme();
    const {mutate:addMeal,isSuccess:isAddSuccess} =useAddMeal()
    const placeholderImage = require('../assets/images/placeholder.png');
    const [form, setForm] = useState({
        name: '',
        weight_g: '',
        calories_kcal: '',
        protein_g: '',
        carbo_g: '',
        fat_g: '',
        img: '',
    });

    useEffect(() => {
        if(isAddSuccess){
            router.back()
        }
    }, [isAddSuccess]);




    // Errors state
    const [errors, setErrors] = useState({});

    // Update form values
    const handleChange = (key, value) => {
        setForm({...form, [key]: value});
    };


    const imageSelectHandler =async () => {

      const result=  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleChange('img',result.assets[0].uri)
        }

    }

    // Validate and submit form
    const handleSubmit = () => {
        const newErrors = {};

        // Validate required numeric fields
        ['weight_g', 'calories_kcal', 'protein_g', 'carbo_g', 'fat_g'].forEach((key) => {
            if (!isNumber(form[key])) {
                newErrors[key] = 'Must be a valid number';
            }
        });

        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop submit
        }

        setErrors({});


        // Prepare meal item object
        const mealItem = {
            id:Math.random().toString(),
            name: form.name.trim(),
            weight_g: parseFloat(form.weight_g),
            calories_kcal: parseFloat(form.calories_kcal),
            protein_g: parseFloat(form.protein_g),
            carbo_g: parseFloat(form.carbo_g),
            fat_g: parseFloat(form.fat_g),
            img: form.img.trim(),
        };

        // onSubmit(mealItem);
         addMeal({mealItem})
        // Reset form
        setForm({
            name: '',
            weight_g: '',
            calories_kcal: '',
            protein_g: '',
            carbo_g: '',
            fat_g: '',
            img: '',
        });
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <Card style={styles.card}>

                <Card.Content>

                    {/* Name */}
                    <TextInput
                        label="Name"
                        value={form.name}
                        onChangeText={(text) => handleChange('name', text)}
                        style={styles.input}
                        mode="outlined"
                        error={!!errors.name}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    {/* Numeric Fields */}
                    {[
                        {label: 'Weight (g)', key: 'weight_g'},
                        {label: 'Calories (kcal)', key: 'calories_kcal'},
                        {label: 'Protein (g)', key: 'protein_g'},
                        {label: 'Carbs (g)', key: 'carbo_g'},
                        {label: 'Fat (g)', key: 'fat_g'},
                    ].map(({label, key}) => (
                        <View key={key} style={{marginBottom: 8}}>
                            <TextInput
                                label={label}
                                value={form[key]}
                                onChangeText={(text) => handleChange(key, text)}
                                keyboardType="numeric"
                                mode="outlined"
                                error={!!errors[key]}
                            />
                            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
                        </View>
                    ))}

                    {/* Image URL */}
                    <TextInput
                        label="Image URL"
                        value={form.img}
                        onChangeText={(text) => handleChange('img', text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <View style={styles.imageWrapper}>
                        <Text style={styles.previewLabel}>Image Preview:</Text>
                        <View style={styles.imageContainer}>
                            <Pressable onPress={() => {
                                imageSelectHandler()
                            }}>


                                <Image
                                    onError={(error) => console.log('Image loading failed on iOS:', error.nativeEvent.error)}

                                    source={
                                        typeof form.img === 'string'
                                            ? form.img.trim() !== ''
                                                ? {uri: form.img}
                                                : placeholderImage
                                            : form.img || placeholderImage // form.img from require(), fallback to placeholder
                                    }
                                    style={styles.image}
                                    resizeMode="cover"
                                    onError={(e) => {
                                        console.warn('Image failed to load:', e.nativeEvent.error);
                                    }}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                router.back()
                            }}
                            style={{marginTop: 12}}
                            buttonColor={theme.colors.primary}
                        >
                           Cancel
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={{marginTop: 12}}
                            buttonColor={theme.colors.primary}
                        >
                            Add Meal
                        </Button>
                    </View>


                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 12,
        borderRadius: 12,
    },
    input: {
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 4,
        marginTop: 2,
    },
    imageContainer: {
        width: 180,
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
    },

    image: {
        width: '100%',
        height: '100%',
    }, imageWrapper: {
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 16,
    },

    previewLabel: {
        fontSize: 14,
        marginBottom: 4,
        color: '#444',
    },
});

export default MealInputForm;
