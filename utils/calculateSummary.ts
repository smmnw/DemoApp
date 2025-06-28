import {Meal,MealEstimate} from "@/types";

export const calculateEstimate = (foodArray:Meal[]) => {
    return foodArray.reduce(
        (totals:MealEstimate, item:Meal) => {
            totals.calories_kcal += item.calories_kcal || 0;
            totals.protein_g += item.protein_g || 0;
            totals.carbo_g += item.carbo_g || 0;
            totals.fat_g += item.fat_g || 0;
            return totals;
        },
        {
            calories_kcal: 0,
            protein_g: 0,
            carbo_g: 0,
            fat_g: 0,
        }
    );
};
