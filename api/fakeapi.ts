import {foodData} from "@/data/fakedata";

export const getAllMeals =()=>{
    return foodData
}

export const getMealById = (id:string)=>{
    return foodData.find(item=>item.id==id)
}

export const deleteMealById = (id: string) => {
    const index = foodData.findIndex(item => item.id === id);
    if (index !== -1) {
        foodData.splice(index, 1); // 💥 removes item in place
    }
}

export const addMeal = (meal:any)=>{
    foodData.push(meal)
}

export const updateMeal = (updatedMeal: any) => {
    const index = foodData.findIndex(item => item.id === updatedMeal.id);

    if (index !== -1) {
        foodData[index] = { ...foodData[index], ...updatedMeal }; // 💡 merge or replace
    } else {
        console.warn(`Meal with id "${updatedMeal.id}" not found.`);
    }
};