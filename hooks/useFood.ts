import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addMeal, deleteMealById, getAllMeals, getMealById, updateMeal} from "@/api/fakeapi";

export const useReadAllMeals = () => {
    return useQuery({
        queryFn: () => getAllMeals(),
        queryKey: ['meals']
    })
}

export const useReadMealById = (id: string | string[]) => {
    return useQuery({
        queryFn: () => getMealById(id),
        queryKey: ['meal'],
        enabled: !!id
    })
}

export const useDeleteMealById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id}: any) => deleteMealById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meals']})
        }
    })
}

export const useAddMeal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({mealItem}: any) => addMeal(mealItem),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meals']})
        }
    })
}
    export const useUpdateMeal = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({mealItem}: any) => updateMeal(mealItem),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:['meals']})
            }
        })
    }
